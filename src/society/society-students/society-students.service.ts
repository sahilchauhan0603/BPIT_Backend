import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './societyStudentsDTO/create-student.dto';
import { UpdateStudentDto } from './societyStudentsDTO/update-student.dto';
import { SocietyMember } from '@prisma/client';

@Injectable()
export class SocietyStudentsService {
  constructor(private prisma: PrismaService) {}

  async addNewStudent(dto: CreateStudentDto) {
    // Create the new society member
    const newSocietyMember = await this.prisma.societyMember.create({
      data: {
        memberId: dto.memberId,
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
    memberId: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<any> {
    // Find the user by enrollmentNo to get userId
    const user = await this.prisma.societyMember.findUnique({
      where: { memberId: memberId },
    });

    // Check if the user exists
    if (!user) {
      return { status: 'error', message: 'User not found!' };
    }

    // Update the student with the provided data
    const updatedStudent = await this.prisma.societyMember.update({
      where: { memberId: memberId },
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

  // Fetch by userId
  async fetchStudent(userId: number) {
    return this.prisma.societyMember.findMany({
      where: { userId: userId },
    });
  }

  // async fetchContributions(enrollmentNo: number): Promise<SocietyMember> {
  //   return await this.prisma.societyMember.findUnique({
  //     where: { enrollmentNo },
  //     select: { studentContributions: true },
  //   });
  // }

  // removeStudent by member id
  async removeStudent(memberId: number): Promise<{ message: string }> {
    // Find the user by enrollmentNo to get userId
    const student = await this.prisma.societyMember.findUnique({
      where: { memberId: memberId },
    });

    // Check if the user exists
    if (!student) {
      return { message: 'User not found' }; // or throw an error if needed
    }

    // Delete the corresponding society member using userId
    await this.prisma.societyMember.delete({
      where: { memberId: memberId },
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
