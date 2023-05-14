import { Processor, IProcessor } from '@midwayjs/bull';
import { QueueName } from './queue-const';
import { DBManager } from '../utils/db-manager';
import { UserGeneralIntro } from '../entity/user-general-intro';
import { AceLogger } from '../utils/ace-logger';

@Processor(QueueName.natalLoveIntro)
export class natalLoveIntroProcessor implements IProcessor {
  async execute(params) {
    const { introId } = params;
    AceLogger.logger.info(
      '[Queue natalLoveIntroProcessor] run with introId: ',
      introId
    );

    const intro = await DBManager.em.findOne(UserGeneralIntro, introId);
    if (!intro) return;
  }
}
