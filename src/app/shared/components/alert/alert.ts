export class Alert {
  constructor(
    public readonly type: AlertType,
    public readonly message: string
  ) { }
}
export enum AlertType {
  SUCCESS,
  WARNING,
  DANGER,
  INFO

}
