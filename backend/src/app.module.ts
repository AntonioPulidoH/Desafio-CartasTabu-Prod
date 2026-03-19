import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';
import { ThemesModule } from './themes/themes.module';
import { FamiliesModule } from './families/families.module';
import { VocationalFamiliesModule } from './vocational-families/vocational-families.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    CardsModule,
    ThemesModule,
    FamiliesModule,
    VocationalFamiliesModule,
    AiModule
  ],
})
export class AppModule {}