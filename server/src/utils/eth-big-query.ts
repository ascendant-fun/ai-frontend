import { BigQuery } from '@google-cloud/bigquery';

export class EthBigQuery {
  private static _instance: EthBigQuery;
  private constructor() {
    this._bigQuery = new BigQuery();
  }
  public static get i() {
    return this._instance || (this._instance = new this());
  }

  private _bigQuery: BigQuery;

  async exec(query: string) {
    // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
    const options = {
      query: query,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'US',
    };

    // Run the query as a job
    const [job] = await this._bigQuery.createQueryJob(options);

    // Wait for the query to finish
    const res = await job.getQueryResults();

    return res;
  }
}
