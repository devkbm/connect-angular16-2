export class SurveyItem {
  constructor(
    public itemId: number,
    public formId: number,
    public itemType: string,
    public label: string,
    public value: string,
    public required: boolean,
    public comment: string) {}
}
