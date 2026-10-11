import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Unhandled Application Error:', err);

  if (err instanceof ZodError || err?.name === 'ZodError' || Array.isArray(err?.issues)) {
    const issues = err.issues || err.errors || [];
    res.status(400).json({
      message: 'Validation failed',
      errors: issues.map((e: any) => ({
        field: Array.isArray(e.path) ? e.path.join('.') : String(e.path || ''),
        message: e.message
      }))
    });
    return;
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
}
