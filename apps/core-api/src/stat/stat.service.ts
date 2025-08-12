import { Injectable } from '@nestjs/common';
import { SurveyService } from './../survey/survey.service';
import { AnswerService } from 'src/answer/answer.service';

type Option = {
  value: string;
  text: string;
};

type Component = {
  fe_id: string;
  type: string; // 'surveyRadio' | 'surveyCheckbox' | ...
  props?: {
    options?: Option[]; // for radio
    list?: Option[]; // for checkbox
    [key: string]: unknown;
  };
};

type Survey = {
  componentList?: Component[];
};

type AnswerItem = {
  componentId: string;
  value: string;
};

type Answer = {
  _id: string;
  answerList?: AnswerItem[];
};

@Injectable()
export class StatService {
  constructor(
    private readonly surveyService: SurveyService,
    private readonly answerService: AnswerService,
  ) {}

  private _getRadioOptText(
    value: string,
    props: { options?: Option[] } = {},
  ): string {
    const { options = [] } = props;
    return options.find((item) => item.value === value)?.text ?? '';
  }

  private _getCheckboxOptText(
    value: string,
    props: { list?: Option[] } = {},
  ): string {
    const { list = [] } = props;
    return list.find((item) => item.value === value)?.text ?? '';
  }

  private _genAnswersInfo(
    survey: Survey,
    answerList: AnswerItem[] = [],
  ): Record<string, string> {
    const res: Record<string, string> = {};
    const { componentList = [] } = survey;

    answerList.forEach((a) => {
      const { componentId: componentFeId, value } = a;
      const comp = componentList.find((c) => c.fe_id === componentFeId);
      if (!comp) return;

      const { type, props = {} } = comp;

      if (type === 'surveyRadio') {
        res[componentFeId] = value
          .split(',')
          .map((v) => this._getRadioOptText(v, props))
          .toString();
      } else if (type === 'surveyCheckbox') {
        res[componentFeId] = value
          .split(',')
          .map((v) => this._getCheckboxOptText(v, props))
          .toString();
      } else {
        res[componentFeId] = value.toString();
      }
    });

    return res;
  }

  async getSurveyStatListAndCount(
    surveyId: string,
    opt: { page: number; pageSize: number },
  ): Promise<{ list: Record<string, string>[]; total: number }> {
    const noData = { list: [], total: 0 };
    if (!surveyId) return noData;

    const q = (await this.surveyService.findOne(surveyId)) as Survey | null;
    if (!q) return noData;

    const total = await this.answerService.count(surveyId);
    if (total === 0) return noData;

    const answers = (await this.answerService.findAll(
      surveyId,
      opt,
    )) as unknown as Answer[];

    const list = answers.map((a) => ({
      _id: a._id,
      ...this._genAnswersInfo(q, a.answerList ?? []),
    }));

    return { list, total };
  }

  async getComponentStat(
    surveyId: string,
    componentFeId: string,
  ): Promise<{ name: string; count: number }[]> {
    if (!surveyId || !componentFeId) return [];

    const q = (await this.surveyService.findOne(surveyId)) as Survey | null;
    if (!q) return [];

    const comp = q.componentList?.find((c) => c.fe_id === componentFeId);
    if (!comp) return [];

    const { type, props = {} } = comp;
    if (type !== 'surveyRadio' && type !== 'surveyCheckbox') return [];

    const total = await this.answerService.count(surveyId);
    if (total === 0) return [];

    const answers = (await this.answerService.findAll(surveyId, {
      page: 1,
      pageSize: total,
    })) as unknown as Answer[];

    const countInfo: Record<string, number> = {};
    answers.forEach((ans) => {
      ans.answerList?.forEach((a) => {
        if (a.componentId !== componentFeId) return;
        a.value.split(',').forEach((v) => {
          countInfo[v] = (countInfo[v] ?? 0) + 1;
        });
      });
    });

    const list = Object.entries(countInfo).map(([val, count]) => {
      let text = '';
      if (type === 'surveyRadio') {
        text = this._getRadioOptText(val, props);
      } else if (type === 'surveyCheckbox') {
        text = this._getCheckboxOptText(val, props);
      }
      return { name: text, count };
    });

    return list;
  }
}
