import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { handleError, isPrismaError } from 'src/alumni/helper/exception.helper';
import { MailServiceService } from 'src/mail-service/mail-service.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    saltRounds : number = 10; // Number of salt rounds for bcrypt
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailServiceService, // Assuming you have a mail service for sending emails
    ) {}

    async login(email: string, password: string) {
        try {
            // Check if user exists in the database
            const user = await this.prisma.user.findUnique({
                where: { email },
            });
            if (!user) {
                throw new Error('Invalid email or password');
            }
            if(!user.isApproved) {
                throw new Error('User is not approved yet');
            }
            if(!user.isVerified) {
                throw new Error('User is not verified yet');
            }
            // Verify password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            // Generate JWT token
            const payload = { email: user.email, sub: user.userId.toString(), role: user.role };
            const token = await this.jwtService.signAsync(payload, {
                expiresIn: process.env.JWT_EXPIRY,
                secret: process.env.JWT_SECRET,
            });
            return { 
                status: "success",
                message: 'Login successful',
                access_token: token,
                user: {
                    id: user.userId,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    role: user.role,
                    graduationYear: user.passingYear,
                    department: user.branch,
                    phoneNumber: user.mobile,
                },
            };
        } catch (error) {
            // Handle errors appropriately
            handleError(error);
        }
    }

    async register(input: RegisterDto) {
        // Check if user already exists
        try {
            const existingUser = await this.prisma.user.findFirst({
                where: { 
                    OR: [
                        { email: input.email },
                        { mobile: input.mobile} ,
                        { enrollmentNumber: input.enrollmentNumber },
                    ]
                },
            });
            if (existingUser) {
                throw new Error('User with this email or mobile number already exists');
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(input.password, this.saltRounds);
            // Create a new user in the database
            const user = await this.prisma.user.create({
                data: {
                    firstName: input.firstName,
                    lastName: input.lastName,
                    email: input.email,
                    password: hashedPassword,
                    role: input.role,
                    enrollmentNumber: input.enrollmentNumber,
                    section: input.section,
                    passingYear: input.passingYear,
                    mobile: input.mobile,
                    isApproved: false,
                    isVerified: false,
                    branch: input.branch,
                    fathersName: "",
                    mothersName: "",
                    hobby: "",
                    parentsPhone: "",
                    societyId: null,
                    facultyId: null,
                },
            });
            if(!user) {
                throw new Error('User registration failed');
            }
            // Send verification email (implement this function)
            const res = await this.sendVerificationEmail(user);
            if(!res.success) {
                throw new Error('Failed to send verification email');
            }

            // Return success message
            return {
                status: "success",
                message: 'Verification email Sent successfully',
                user: {
                    id: user.userId,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    role: user.role,
                    graduationYear: user.passingYear,
                    department: user.branch,
                    phoneNumber: user.mobile,
                },
            };
        } catch (error) {
            // Handle errors appropriately
            handleError(error);
        }
    }

    // async logout() {
    //     // Implement logout logic here

    //     return { message: 'Logout successful' };
    // }

    async forgotPassword() {
        // Implement forgot password logic here
        return { message: 'Forgot password email sent' };
    }
    async verifyEmail(token: string) {
        try {
            const tokenRecord = await this.prisma.verificationToken.findFirst({ where: { token }, include: { user: true } });
            if(!tokenRecord) {
                return { message: 'Token not found' };
            }
            if(tokenRecord.expiresAt < new Date()) {
                return { message: 'Token expired' };
            }
            const user = await this.prisma.user.update({ where: { userId: tokenRecord.user.userId }, data: { isVerified: true } });
            if(!user) {
                return { message: 'User not found' };
            }
            await this.prisma.verificationToken.delete({ where: { id: tokenRecord.id } });
            return { 
                status: 'success',
                message: 'Email verification successful'
            };

        } catch (error) {
            if (isPrismaError(error) && error.code === 'P2025') {
                throw new HttpException(
                    { status: 'error', message: 'Required Data not found' },
                    HttpStatus.NOT_FOUND,
                );
            }
            handleError(error);
        }
    }

    async sendVerificationEmail(user: User) {
        const email = user.email;
        const token = this.jwtService.sign({ email, id: user.userId.toString() }, { expiresIn: process.env.JWT_EXPIRY, secret: process.env.JWT_SECRET });
        const existingToken = await this.prisma.verificationToken.findUnique({where: { email }});
        if (existingToken) {
            await this.prisma.verificationToken.delete({
                where: {
                    email,
                },
            });
        }
        await this.prisma.verificationToken.create({
            data: {
                email,
                token,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000), // Token expires in 1 hour
            },
        });

        const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`;
        const message = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8" />
                <title>Email Verification</title>
                <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f7;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }
                .email-container {
                    max-width: 600px;
                    margin: 40px auto;
                    background-color: #ffffff;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
                }
                .button {
                    display: inline-block;
                    padding: 12px 20px;
                    margin-top: 20px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 6px;
                    font-weight: bold;
                }
                .footer {
                    margin-top: 30px;
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                }
                </style>
            </head>
            <body>
                <div class="email-container">
                <h2>Welcome to Our Platform!</h2>
                <p>
                    Thank you for signing up. Please click the button below to verify your email address Link is Valid only for 1 hour:
                </p>
                <a href="${verificationLink}" class="button">Verify Email</a>
                <p>
                    If the button doesn't work, you can also copy and paste the following link into your browser:
                </p>
                <p><a href="${verificationLink}">${verificationLink}</a></p>
                <div class="footer">
                    If you did not create an account, no further action is required.
                </div>
                </div>
            </body>
            </html>`;
        const send = await this.mailService.sendMail(email, 'Email Verification', message);
        return {
            ...send,
            token
        };
    }

}
