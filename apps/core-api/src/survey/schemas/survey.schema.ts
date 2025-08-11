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
}

export const SurveySchema = SchemaFactory.createForClass(Survey);
