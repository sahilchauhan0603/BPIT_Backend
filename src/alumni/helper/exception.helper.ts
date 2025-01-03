import { HttpException, HttpStatus } from "@nestjs/common";

// Helper Methods
export function handleError(error: any): never {
    if (error instanceof HttpException) {
      throw error;
    }

    const message = error.message || 'Internal Server Error';
    const status = error.status || HttpStatus.INTERNAL_SERVER_ERROR;

    throw new HttpException(
      { status: 'error', message },
      status,
    );
}

export function isPrismaError(error: any): error is { code: string } {
    return error && typeof error.code === 'string';
}