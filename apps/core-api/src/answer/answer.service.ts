import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Answer } from './schema/answer.schema';
import { AnswerDto } from './dto/answer.dto';
import { Model } from 'mongoose';

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
  ) {}

  async create(answerInfo: AnswerDto): Promise<unknown> {
    if (answerInfo.surveyId == null) {
      throw new HttpException('缺少问卷 id', HttpStatus.BAD_REQUEST);
    }

    const answer = new this.answerModel(answerInfo);
    return await answer.save();
  }

  async count(surveyId: string) {
    if (!surveyId) return 0;
    return await this.answerModel.countDocuments({ surveyId });
  }

  async findAll(surveyId: string, opt: { page: number; pageSize: number }) {
    if (!surveyId) return [];

    const { page = 1, pageSize = 10 } = opt;
    const list = await this.answerModel
      .find({ surveyId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 });

    return list;
  }
}
