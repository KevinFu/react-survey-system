import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { Survey, SurveySchema } from './schemas/survey.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Survey.name, schema: SurveySchema }]),
  ],
  providers: [SurveyService],
  controllers: [SurveyController],
})
export class SurveyModule {}
