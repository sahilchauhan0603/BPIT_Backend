import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './societyStudentsDTO/create-student.dto';
import { UpdateStudentDto } from './societyStudentsDTO/update-student.dto';
import { SocietyMember } from '@prisma/client';

@Injectable()
export class SocietyStudentsService {
  constructor(private prisma: PrismaService) {}

  async addNewStudent(dto: CreateStudentDto) {
    // Validate the existence of the user
    const user = await this.prisma.user.findUnique({
      where: { userId: dto.userId },
    });

    if (!user) {
      throw new Error(`User with ID ${dto.userId} does not exist`);
    }

    // Validate the existence of the society
    const society = await this.prisma.societyProfile.findUnique({
      where: { societyId: dto.societyId },
    });

    if (!society) {
      throw new Error(`Society with ID ${dto.societyId} does not exist`);
    }

    // Create the new society member
    const newSocietyMember = await this.prisma.societyMember.create({
      data: {
        userId: dto.userId,
        societyId: dto.societyId,
        societyPosition: dto.societyPosition,
        domainExpertise: dto.domainExpertise,
        memberType: dto.memberType,
        studentContributions: dto.studentContributions,
        isApproved: dto.isApproved ?? true, // Default to true if not provided
        isActiveMember: dto.isActiveMember ?? true, // Default to true if not provided
        dateJoined: dto.dateJoined,
        dateResigned: dto.dateResigned ?? null, // Default to null if not provided
        // society: {
        //   connect: { societyId: dto.societyId }, // Correct connection to existing society
        // },
      },
      include: {
        user: true,
        society: true,
      },
    });

    // Return the newly created society member
    return {
      status: 'success',
      item: newSocietyMember,
      message: 'Society member created successfully',
    };
  }

  async updateStudent(
    enrollmentNo: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<any> {
    // Find the user by enrollmentNo to get userId
    const user = await this.prisma.user.findUnique({
      where: { enrollmentNumber: enrollmentNo },
    });

    // Check if the user exists
    if (!user) {
      return { status: 'error', message: 'User not found!' };
    }

    // Find the corresponding society member using userId
    const student = await this.prisma.societyMember.findUnique({
      where: { userId: user.userId },
    });

    // Check if the student exists in societyMember
    if (!student) {
      return { status: 'error', message: 'Student not found in society!' };
    }

    // Update the student with the provided data
    const updatedStudent = await this.prisma.societyMember.update({
      where: { userId: user.userId },
      data: updateStudentDto,
    });

    // Return a success response with the updated student
    return {
      status: 'success',
      item: updatedStudent,
      message: 'Student updated successfully',
    };
  }

  async fetchAllStudents(): Promise<SocietyMember[]> {
    return await this.prisma.societyMember.findMany();
  }

  async fetchStudent(enrollmentNo: number): Promise<SocietyMember | null> {
    // Find the user by enrollmentNo to get userId
    const user = await this.prisma.user.findUnique({
      where: { enrollmentNumber: enrollmentNo },
    });

    // Check if the user exists
    if (!user) {
      return null; // or you can throw an error if required
    }

    // Fetch the corresponding society member using userId
    return await this.prisma.societyMember.findUnique({
      where: { userId: user.userId },
    });
  }

  // async fetchContributions(enrollmentNo: number): Promise<SocietyMember> {
  //   return await this.prisma.societyMember.findUnique({
  //     where: { enrollmentNo },
  //     select: { studentContributions: true },
  //   });
  // }

  async removeStudent(enrollmentNo: number): Promise<{ message: string }> {
    // Find the user by enrollmentNo to get userId
    const user = await this.prisma.user.findUnique({
      where: { enrollmentNumber: enrollmentNo },
    });

    // Check if the user exists
    if (!user) {
      return { message: 'User not found' }; // or throw an error if needed
    }

    // Delete the corresponding society member using userId
    await this.prisma.societyMember.delete({
      where: { userId: user.userId },
    });

    return { message: 'Student successfully deleted' };
  }

  async fetchStudentsBySocietyID(societyID: number): Promise<SocietyMember[]> {
    return await this.prisma.societyMember.findMany({
      where: { societyId: Number(societyID) },
    });
  }

  // ADMIN PANEL
  async fetchAllStudentsAdmin(): Promise<any[]> {
    return await this.prisma.societyMember.findMany({
      include: {
        user: {
          select: {
            enrollmentNumber: true,
            profilePictureUrl: true,
            firstName: true,
            lastName: true,
            branch: true,
            passingYear: true,
            mobile: true,
            email: true,
          },
        },
      },
    });
  }

  async fetchStudentsSocietyAdmin(societyID: number): Promise<any[]> {
    return await this.prisma.societyMember.findMany({
      where: { societyId: Number(societyID) },
      include: {
        user: {
          select: {
            enrollmentNumber: true,
            profilePictureUrl: true,
            firstName: true,
            lastName: true,
            branch: true,
            passingYear: true,
            mobile: true,
            email: true,
          },
        },
      },
    });
  }
}
