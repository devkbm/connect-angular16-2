/*
export class ResponseObject<T> {
  constructor(
    public total: number,
    public success: boolean,
    public message: string,
    public data: T) {}
}
*/

export interface ResponseObject<T> {
  total: number;
  success: boolean;
  message: string;
  data: T;
}
