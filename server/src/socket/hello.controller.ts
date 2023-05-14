import {
  WSController,
  OnWSMessage,
  Provide,
  WSEmit,
} from '@midwayjs/decorator';
import { SocketRequestEvent, SocketResponseEvent } from './interface';

@Provide()
@WSController('/')
export class HelloController {
  @OnWSMessage(SocketRequestEvent.HELLO)
  @WSEmit(SocketResponseEvent.HELLO)
  async hello(params: any) {
    return 'helloworld' + params;
  }
}
