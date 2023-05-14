import { User } from '../../entity/user';
import {
  GenderType,
  RelationshipType,
  UserProfile,
} from '../../entity/user-profile';
import { IServiceable } from '../interface-service';
import { EntityManager } from 'typeorm';

export class UserProfileCreateService implements IServiceable {
  private _user: User;
  private _nickname: string;
  private _gender: GenderType;
  private _relationship: RelationshipType;
  private _birthday: Date;
  private _birthLat: number;
  private _birthLng: number;
  private _birthLocation: string;
  private _curLat: number;
  private _curLng: number;
  private _curLocation: string;

  constructor(
    user: User,
    nickname: string,
    gender: GenderType,
    relationship: RelationshipType,
    birthday: Date,
    birthLat: number,
    birthLng: number,
    birthLocation: string,
    curLat: number,
    curLng: number,
    curLocation: string
  ) {
    this._user = user;
    this._nickname = nickname;
    this._gender = gender;
    this._relationship = relationship;
    this._birthday = birthday;
    this._birthLat = birthLat;
    this._birthLng = birthLng;
    this._birthLocation = birthLocation;
    this._curLat = curLat;
    this._curLng = curLng;
    this._curLocation = curLocation;
  }

  async exec(em: EntityManager) {
    let profile = new UserProfile();
    profile.user = this._user;
    profile.userId = this._user.id;
    profile.nickname = this._nickname;
    profile.gender = this._gender;
    profile.relationship = this._relationship;
    profile.birthday = this._birthday;
    profile.birthLat = this._birthLat;
    profile.birthLng = this._birthLng;
    profile.birthLocation = this._birthLocation;
    profile.currentLat = this._curLat;
    profile.currentLng = this._curLng;
    profile.curLocation = this._curLocation;

    profile = await em.save(profile);

    return profile;
  }
}
