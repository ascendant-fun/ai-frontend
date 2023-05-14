import { Configuration, App, Inject } from '@midwayjs/decorator';
import * as upload from '@midwayjs/upload';
import * as orm from '@midwayjs/orm';
import * as koa from '@midwayjs/koa'; // 一定要放到 socketio 前，否则有 cors 问题
import * as staticFile from '@midwayjs/static-file';
import * as socketio from '@midwayjs/socketio';
import { Application as SocketApplication } from '@midwayjs/socketio';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as task from '@midwayjs/task';
import views from 'koa-views';
import { join } from 'path';
import * as crossDomain from '@midwayjs/cross-domain';
//import { DefaultErrorFilter } from './filter/default.filter';
//import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { GameInit } from './utils/game-init';
import * as bull from '@midwayjs/bull';
import * as i18n from '@midwayjs/i18n';

@Configuration({
  imports: [
    socketio,
    upload,
    staticFile,
    task,
    orm,
    koa,
    crossDomain,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    bull,
    i18n,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  @App('socketIO')
  socketApp: SocketApplication;

  @Inject()
  bullFramework: bull.Framework;

  @Inject()
  i18nService: i18n.MidwayI18nServiceSingleton;

  async onReady() {
    this.app.getLogger().info('Start to init...');

    // koa cross domain
    this.app.use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
      );
      ctx.set(
        'Access-Control-Allow-Methods',
        'PUT, POST, GET, DELETE, OPTIONS'
      );
      if (ctx.method === 'OPTIONS') {
        ctx.body = 200;
      } else {
        await next();
      }
    });

    // koa html render
    this.app.use(
      views(__dirname + '/views', {
        extension: 'html',
        map: { html: 'underscore' },
      })
    );

    // add middleware
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    //this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);

    await GameInit.init(
      this.app.getLogger(),
      this.socketApp,
      this.app.getConfig(),
      this.bullFramework,
      this.i18nService,
      false
    );

    this.app.getLogger().info('Init finished!');
  }
}
