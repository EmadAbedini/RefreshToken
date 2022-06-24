import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('is-public', true);
