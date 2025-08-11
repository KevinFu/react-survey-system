export class AnswerDto {
  readonly surveyId: string;
  readonly answerList: {
    componentFeId: string;
    value: string[];
  }[];
}
