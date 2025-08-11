import { DeleteResult, Model, RootFilterQuery, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';
import { Survey } from './schemas/survey.schema';

@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Survey.name) private readonly surveyModule: Model<Survey>,
  ) {}

  async create(username: string) {
    const question = new this.surveyModule({
      title: '问卷标题' + Date.now(),
      desc: '问卷描述',
      author: username,
      componentList: [
        {
          fe_id: nanoid(),
          type: 'questionInfo',
          title: '问卷信息',
          props: { title: '问卷标题', desc: '问卷描述...' },
        },
      ],
    });

    return await question.save();
  }

  async findOne(id: string) {
    return await this.surveyModule.findById(id);
  }

  async delete(id: string, author: string) {
    const res = await this.surveyModule.findOneAndDelete({
      _id: id,
      author,
    });
    return res;
  }

  async deleteMany(ids: string[], author: string): Promise<DeleteResult> {
    const res = await this.surveyModule.deleteMany({
      _id: { $in: ids },
      author,
    });
    return res;
  }

  async update(id: string, updateData: UpdateQuery<Survey>, author) {
    return await this.surveyModule.updateOne({ _id: id, author }, updateData);
  }

  async findAll({
    keyword = '',
    page = 1,
    pageSize = 10,
    isDeleted = false,
    isStar,
    author = '',
  }) {
    const whereOption: RootFilterQuery<Survey> = {
      author,
      isDeleted,
      isStar,
    };
    if (isStar != null) whereOption.isStar = isStar as boolean;

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

  async countAll({ keyword = '', isDeleted = false, author = '', isStar }) {
    const whereOption: RootFilterQuery<Survey> = {
      author,
      isDeleted,
    };
    if (isStar != null) whereOption.isStar = isStar as boolean;

    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOption.title = { $regex: reg };
    }
    return await this.surveyModule.countDocuments(whereOption);
  }
}
