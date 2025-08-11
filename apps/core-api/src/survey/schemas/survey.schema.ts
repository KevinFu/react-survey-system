import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SurveyDocument = HydratedDocument<Survey>;

@Schema({
  timestamps: true,
})
export class Survey {
  @Prop({ isRequired: true })
  title: string;

  @Prop()
  desc: string;

  @Prop({ isRequired: true })
  author: string;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isStar: boolean;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  componentList: {
    fe_id: string;
    type: string;
    title: string;
    isHidden: boolean;
    isLocked: boolean;
    props: object;
  }[];
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
