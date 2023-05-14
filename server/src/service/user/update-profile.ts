import { ErrorCode } from '../../error-code';
import {
  GenderType,
  RelationshipType,
  UserProfile,
} from '../../entity/user-profile';
import { IServiceable } from '../interface-service';
import { EntityManager } from 'typeorm';

export class UserProfileUpdateService implements IServiceable {
  private _profileId: number;
  private _nickname: string;
  private _gender: GenderType;
  private _relationship: RelationshipType;
  private _birthday: Date;
  private _curLat: number;
  private _curLng: number;
  private _curLocation: string;

  constructor(
    profileId: number,
    nickname: string,
    gender: GenderType,
    relationship: RelationshipType,
    birthday: Date,
    curLat: number,
    curLng: number,
    curLocation: string
  ) {
    this._profileId = profileId;
    this._nickname = nickname;
    this._gender = gender;
    this._relationship = relationship;
    this._birthday = birthday;
    this._curLat = curLat;
    this._curLng = curLng;
    this._curLocation = curLocation;
  }

  async exec(em: EntityManager) {
    let profile = await em.findOne(UserProfile, this._profileId);

    if (!profile) throw ErrorCode.PROFILE_EMPTY;

    if (
      profile.birthday.getUTCFullYear() != this._birthday.getUTCFullYear() ||
      profile.birthday.getUTCMonth() != this._birthday.getUTCMonth() ||
      profile.birthday.getUTCDate() != this._birthday.getUTCDate()
    ) {
      return ErrorCode.PROFILE_BIRTHDAY_UNEDITABLE;
    }

    profile.nickname = this._nickname;
    profile.gender = this._gender;
    profile.relationship = this._relationship;
    profile.birthday = this._birthday;
    profile.currentLat = this._curLat;
    profile.currentLng = this._curLng;
    profile.curLocation = this._curLocation;

    profile = await em.save(profile);

    return profile;
  }
}
