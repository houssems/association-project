import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const QueryParam = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();
  return { ...req.query, ...req.params };
});