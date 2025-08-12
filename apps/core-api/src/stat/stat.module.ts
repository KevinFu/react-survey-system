import { Module } from '@nestjs/common';
import { StatService } from './stat.service';
import { StatController } from './stat.controller';
import { AnswerModule } from 'src/answer/answer.module';
import { SurveyModule } from 'src/survey/survey.module';

@Module({
  imports: [AnswerModule, SurveyModule],
  providers: [StatService],
  controllers: [StatController],
})
export class StatModule {}
