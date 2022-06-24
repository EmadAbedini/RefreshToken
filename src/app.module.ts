import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './auth/guards';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    // To enable `configModule` for all routes
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // config `RateLimiting`
    ThrottlerModule.forRoot({
      ttl: parseInt(process.env.RATE_LIMIT_TIME_TO_LIVE),
      limit: parseInt(process.env.RATE_LIMIT_MAX_NUMBER_REQUEST),
    }),
  ],

  providers: [
    // To set `ATGuard` as global guard for all routes
    { provide: APP_GUARD, useClass: AtGuard },
    // To enable `RateLimit` for all routes
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
