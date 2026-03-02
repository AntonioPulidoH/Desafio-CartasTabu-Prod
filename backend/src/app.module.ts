import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ThemesModule } from './themes/themes.module';
import { VocationalFamiliesModule } from './vocational-families/vocational-families.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    ThemesModule,
    VocationalFamiliesModule,
  ],
})
export class AppModule {}