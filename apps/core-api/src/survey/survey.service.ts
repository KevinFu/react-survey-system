/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Survey } from './schemas/survey.schema';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name) private readonly surveyModule: Model<Survey>,
  ) {}

  async create() {
    const survey = new this.surveyModule({
      title: 'title' + Date.now(),
      desc: 'desc',
    });

    return await survey.save();
  }

  async findOne(id: string) {
    return await this.surveyModule.findById(id);
  }

  async delete(id: string) {
    return await this.surveyModule.findByIdAndDelete(id);
  }

  async update(id: string, updateData: UpdateQuery<Survey>) {
    return await this.surveyModule.updateOne({ _id: id }, updateData);
  }

  async findAll({ keyword = '', page = 1, pageSize = 10 }) {
    const whereOption: any = {};

    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOption.title = { $regex: reg };
    }

    return await this.surveyModule
      .find(whereOption)
      .sort({ _id: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize);
  }

  async countAll({ keyword = '' }) {
    const whereOption: any = {};

    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOption.title = { $regex: reg };
    }
    return await this.surveyModule.countDocuments(whereOption);
  }
}
