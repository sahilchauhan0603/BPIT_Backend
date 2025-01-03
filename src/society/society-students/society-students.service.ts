import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './societyStudentsDTO/create-student.dto';
import { UpdateStudentDto } from './societyStudentsDTO/update-student.dto';
import { SocietyMember } from '@prisma/client';

@Injectable()
export class SocietyStudentsService {
  constructor(private prisma: PrismaService) {}

  async addNewStudent(dto: CreateStudentDto) {
    // Directly create a new society member
    const newSocietyMember = await this.prisma.societyMember.create({
      data: {
        userId: dto.userId, // Assuming `userId` exists in the DTO
        societyId: dto.societyId, // Assuming `societyId` exists in the DTO
        societyPosition: dto.societyPosition,
        domainExpertise: dto.domainExpertise,
        memberType: dto.memberType,
        studentContributions: dto.studentContributions,
        isApproved: dto.isApproved || true, // Default value for approval status
        isActiveMember: dto.isActiveMember || true, // Default value for active member status
        dateJoined: dto.dateJoined, // Date when the student joined
        dateResigned: dto.dateResigned || null, // Resigned date can be null initially
      },
    });

    // Return a success response with the newly created society member
    return {
      status: 'success',
      item: newSocietyMember,
      message: 'Society member added successfully',
    };
  }

  async updateStudent(
    enrollmentNo: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<any> {
    // Find the student using the provided enrollment number
    const student = await this.prisma.societyMember.findUnique({
      where: { enrollmentNo },
    });

    // Check if the student exists
    if (!student) {
      return { status: 'error', message: 'Student not found!' };
    }

    // Update the student with the provided data
    const updatedStudent = await this.prisma.societyMember.update({
      where: { enrollmentNo },
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

  async fetchStudent(enrollmentNo: number): Promise<SocietyMember> {
    return await this.prisma.societyMember.findUnique({
      where: { enrollmentNo },
    });
  }

  // async fetchContributions(enrollmentNo: number): Promise<SocietyMember> {
  //   return await this.prisma.societyMember.findUnique({
  //     where: { enrollmentNo },
  //     select: { studentContributions: true },
  //   });
  // }

  async removeStudent(enrollmentNo: number): Promise<{ message: string }> {
    await this.prisma.societyMember.delete({
      where: { enrollmentNo },
    });
    return { message: 'Student successfully deleted' };
  }

  async fetchStudentsBySocietyID(societyID: string): Promise<SocietyMember[]> {
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

  async fetchStudentsSocietyAdmin(societyID: string): Promise<any[]> {
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
