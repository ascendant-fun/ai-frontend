export function rtnData(data: any, code: number = RtnCode.OK) {
  return {
    code: code,
    data: data,
  };
}

export enum RtnCode {
  OK = 0,
  ERROR = 1,
}
