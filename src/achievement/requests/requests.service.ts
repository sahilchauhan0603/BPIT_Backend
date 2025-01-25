import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Status } from '../achievements/enum';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}
  // MENTOR ROUTES
  async getUnverifiedRequests(mentorId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [requests, totalRequests] = await Promise.all([
      this.prisma.verificationRequest.findMany({
        where: {
          mentorId,
          status: Status.PENDING
        },
        skip,
        take: limit,
      }),
      this.prisma.verificationRequest.count({
        where: {
          mentorId,
        },
      }),
    ]);

    return {
      status: 'success',
      items: requests,
      currentPage: page,
      totalPages: Math.ceil(totalRequests / limit),
      totalItems: totalRequests,
      message: 'Requests fetched successfully',
    };
  }

  async verifyRequest(requestId: number, status: string) {
    
    const request = await this.prisma.verificationRequest.update({
        where:{
            id:requestId
        },
        data: {
            status: status === 'accepted' ? Status.ACCEPTED : Status.REJECTED
        }
    })
    await this.prisma.achievement.update({
        where: {
            achievementId:request.achievementId
        },
        data: {
            status: status === 'accepted' ? Status.ACCEPTED : Status.REJECTED
        }
    })
    return {
        status: 'success',
        message: 'Request verified successfully',
    }
  }

  async getVerifiedRequests(mentorId: number, page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [requests, totalRequests] = await Promise.all([
      this.prisma.verificationRequest.findMany({
        where: {
          mentorId
        },
        skip,
        take: limit,
      }),
      this.prisma.verificationRequest.count({
        where: {
          mentorId,
        },
      }),
    ]);

    return {
      status: 'success',
      items: requests,
      currentPage: page,
      totalPages: Math.ceil(totalRequests / limit),
      totalItems: totalRequests,
      message: 'Requests fetched successfully',
    };
  }

  async changeStatus(mentorId: number, requestId: number, status: string){
    const request = await this.prisma.verificationRequest.update({
        where: {
            id: requestId
        },
        data: {
            status: status === 'accepted' ? Status.ACCEPTED : Status.REJECTED
        }
    })
    await this.prisma.achievement.update({
        where: {
            achievementId:request.achievementId
        },
        data: {
            status: status === 'accepted' ? Status.ACCEPTED : Status.REJECTED
        }
    })
    return {
        status: 'success',
        message: 'Request verified successfully',
    }
  }

//   ADMIN ROUTES
async getAllRequests(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const [requests, totalRequests] = await Promise.all([
      this.prisma.verificationRequest.findMany({
        skip,
        take: limit,
      }),
      this.prisma.verificationRequest.count(),
    ]);

    return {
      status: 'success',
      items: requests,
      currentPage: page,
      totalPages: Math.ceil(totalRequests / limit),
      totalItems: totalRequests,
      message: 'Requests fetched successfully',
    };
  }

}
