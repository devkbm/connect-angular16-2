/*
export class ResponseList<T> {
  constructor(
    public total: number,
    public success: boolean,
    public message: string,
    public data: Array<T>) {};
}
*/
export interface ResponseList<T> {
  total: number;
  success: boolean;
  message: string;
  data: Array<T>;
}
