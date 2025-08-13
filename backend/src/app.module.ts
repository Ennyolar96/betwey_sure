import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PredictionModule } from './app/prediction/prediction.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongodbConfig from './global/config';
import { GlobalNestModule } from '@app/global.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PredictionModule,
    ConfigModule.forRoot({
      load: [mongodbConfig],
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async () => ({
        uri: process.env.MONGO_URI,
      }),
    }),
    GlobalNestModule,
  ],
  providers: [AppService],
})
export class AppModule {}
