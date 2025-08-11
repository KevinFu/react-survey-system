import mongoose, {
  DeleteResult,
  Model,
  RootFilterQuery,
  UpdateQuery,
} from 'mongoose';
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
    const survey = new this.surveyModule({
      title: 'Survey Title' + Date.now(),
      desc: 'description',
      author: username,
      componentList: [
        {
          fe_id: nanoid(),
          type: 'surveyInfo',
          title: 'Survey Info',
          props: { title: 'Survey Title', desc: 'description...' },
        },
      ],
    });

    return await survey.save();
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

  async duplicate(id: string, author: string) {
    const survey = await this.surveyModule.findById(id);
    if (!survey) return;

    const newSurvey = new this.surveyModule({
      ...survey.toObject(),
      _id: new mongoose.Types.ObjectId(),
      title: survey.title + ' Copy',
      author,
      isPublished: false,
      isStar: false,
      componentList: survey.componentList.map((item) => {
        return {
          ...item,
          fe_id: nanoid(),
        };
      }),
    });
    return await newSurvey.save();
  }

  async findAll({
    keyword = '',
    page = 1,
    pageSize = 10,
    isDeleted,
    isStar,
    author = '',
  }) {
    const whereOption: RootFilterQuery<Survey> = { author };

    if (isStar != null) whereOption.isStar = isStar as boolean;
    if (isDeleted != null) whereOption.isDeleted = isDeleted as boolean;

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

  async countAll({ keyword = '', isDeleted, author = '', isStar }) {
    const whereOption: RootFilterQuery<Survey> = { author };

    if (isStar != null) whereOption.isStar = isStar as boolean;
    if (isDeleted != null) whereOption.isDeleted = isDeleted as boolean;

    if (keyword) {
      const reg = new RegExp(keyword, 'i');
      whereOption.title = { $regex: reg };
    }
    return await this.surveyModule.countDocuments(whereOption);
  }
}
