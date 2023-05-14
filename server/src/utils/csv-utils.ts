import csv = require('csv-parser');
import * as fs from 'fs';
import { join } from 'path';
// eslint-disable-next-line node/no-extraneous-import
import { loggers } from '@midwayjs/logger';
export class CsvUtils {
  private constructor() {}

  static async getCsv(csvPath: string) {
    const appLogger = loggers.getLogger('logger');

    const data = [];
    const path = join(__dirname, '../../', csvPath);
    return new Promise((resolve, reject) => {
      try {
        fs.createReadStream(path)
          .pipe(csv())
          .on('error', error => reject(error))
          .on('data', row => data.push(row))
          .on('end', () => {
            resolve(data);
          });
      } catch (e) {
        appLogger.error(e);
      }
    });
  }
}
