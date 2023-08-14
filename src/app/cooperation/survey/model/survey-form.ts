import { SurveyItem } from './survey-item';

export class SurveyForm {
  constructor(
    public formId: number,
    public title: string,
    public comment: string,
    public items: SurveyItem[]) {}
}
