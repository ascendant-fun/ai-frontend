import { S3 } from 'aws-sdk';
import { CreateBucketRequest } from 'aws-sdk/clients/s3';
import { AceLogger } from './ace-logger';
import fs  from 'fs';

export class AwsS3 {
  private static _instance: AwsS3;
  private constructor() {}
  public static get i() {
    return this._instance || (this._instance = new this());
  }

  private _s3: S3;
  private _bucketName: string;

  async init(config) {
    AceLogger.logger.info(config);
    this._s3 = new S3({
      accessKeyId: config.aws_access_key_id,
      secretAccessKey: config.aws_secret_access_key,
      region: config.region,
    });
    this._bucketName = config.bucket_name;

    await this._initBucket();
  }

  async upload(key: string, filePath: string) {
    try {
      const fileContent = fs.readFileSync(filePath);

      const params = {
        Bucket: this._bucketName,
        Key: key,
        Body: fileContent,
      };

      try {
        const res = await this._s3.upload(params).promise();

        AceLogger.logger.info('File Uploaded with Successfull', res.Location);

        return {
          success: true,
          message: 'File Uploaded with Successfull',
          data: res.Location,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Unable to Upload the file',
          data: error,
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Unalbe to access this file',
        data: {},
      };
    }
  }

  private async _initBucket() {
    const bucketStatus = await this._checkBucket();

    if (!bucketStatus.success) {
      // check if the bucket don't exist
      const bucket = await this._createBucket(); // create new bucket
      AceLogger.logger.info(bucket.message);
    }
  }

  private async _checkBucket() {
    try {
      const res = await this._s3
        .headBucket({ Bucket: this._bucketName })
        .promise();

      AceLogger.logger.info('Bucket already Exist', res.$response.data);

      return { success: true, message: 'Bucket already Exist', data: {} };
    } catch (error) {
      AceLogger.logger.error("Error bucket don't exsit", error);

      return {
        success: false,
        message: "Error bucket don't exsit",
        data: error,
      };
    }
  }

  private async _createBucket() {
    const params: CreateBucketRequest = {
      Bucket: this._bucketName,
      CreateBucketConfiguration: {
        // Set your region here
        // LocationConstraint: region,
      },
    };

    try {
      const res = await this._s3.createBucket(params).promise();

      AceLogger.logger.info('Bucket Created Successfull', res.Location);

      return {
        success: true,
        message: 'Bucket Created Successfull',
        data: res.Location,
      };
    } catch (error) {
      AceLogger.logger.error('Error: Unable to create bucket \n', error);

      return {
        success: false,
        message: 'Unable to create bucket',
        data: error,
      };
    }
  }
}
