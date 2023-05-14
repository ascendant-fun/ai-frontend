export class AceLogger {
  private constructor() {}

  public static logger: any;

  static init(logger: any) {
    this.logger = logger;
  }
}
