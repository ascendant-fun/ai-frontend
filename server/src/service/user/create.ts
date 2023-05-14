import { RegSource, User } from '../../entity/user';
import { IServiceable } from '../interface-service';
import { EntityManager } from 'typeorm';

export class UserCreateService implements IServiceable {
  private _username: string;
  private _source: RegSource;
  private _regId: string;

  constructor(name: string, source: RegSource) {
    this._regId = name;
    this._source = source;
    this._username = User.genUsername(name, source);
  }

  async exec(em: EntityManager) {
    let user = await em.findOne(User, {
      where: {
        username: this._username,
      },
    });

    if (!user) {
      user = new User();
      user.username = this._username;
      user.regSource = this._source;
      user.regId = this._regId;
      user = await em.save(user);
    }

    if(!user.regId){
      user.regId = this._regId;
      user = await em.save(user);
    }

    return user;
  }
}
