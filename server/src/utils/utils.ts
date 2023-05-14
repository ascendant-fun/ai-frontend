export class Utils {
  private constructor() {}

  static getSubStringForLoop(str: string, offset: number, step: number) {
    let targetStr = str;
    while (offset + step > targetStr.length) {
      targetStr = `${targetStr}${str}`;
    }
    return targetStr.substring(offset, offset + step);
  }

  static getProbabilityByHex(
    offset: number,
    step: number,
    numbers: string
  ): number {
    let targetStr = numbers;
    while (offset + step > targetStr.length) {
      targetStr = `${targetStr}${numbers}`;
    }

    const molecule = targetStr.substring(offset, offset + step);

    const prob = parseInt(molecule, 16) / parseInt('f'.repeat(step), 16);

    return prob;
  }

  static scientificNotationToString(param) {
    let strParam = String(param);
    let flag = /e/.test(strParam);
    if (!flag) return param;

    let sysbol = true;
    if (/e-/.test(strParam)) {
      sysbol = false;
    }
    let index = Number(strParam.match(/\d+$/)[0]);
    let basis = strParam.match(/^[\d\.]+/)[0].replace(/\./, '');

    if (sysbol) {
      return basis.padEnd(index + 1, '0');
    } else {
      return basis.padStart(index + basis.length, '0').replace(/^0/, '0.');
    }
  }
}
