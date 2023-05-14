import { IServiceable } from '../interface-service';
import { EntityManager } from 'typeorm';
import { AstroApi } from '../../utils/astro-api';
import { ErrorCode } from '../../error-code';
import { UserProfile } from '../../entity/user-profile';

export class ProfileBirthService implements IServiceable {
  private _profile: UserProfile;

  constructor(profile: UserProfile) {
    this._profile = profile;
  }

  async exec(em: EntityManager) {
    if (!this._profile) throw ErrorCode.PROFILE_EMPTY;
    if (this._profile.natalChartRaw) return this._profile;

    const res = await AstroApi.i.astrolabe(
      this._profile.birthday,
      this._profile.birthLat,
      this._profile.birthLng
    );
    if (!res) throw ErrorCode.PROFILE_NATAL_FETCH_ERROR;

    const natalChart = res.data.data;
    this._profile.natalChartRaw = JSON.stringify(natalChart);

    this._readableNatalChart(natalChart);

    return await em.save(this._profile);
  }

  private _readableNatalChart(natalChart) {
    // #Signs:
    // Sun in Pisces
    // ......
    // #Houses:
    // Sun in the 10th house
    // ......
    const signs = new Array<string>();
    const houses = new Array<string>();
    for (let i = 0; i < natalChart.planets.length; i++) {
      const planet = natalChart.planets[i];
      signs.push(`${planet.planet_cn} in ${planet.constellation_cn}`);
      houses.push(`${planet.planet_cn} in the House ${planet.place_on}`);
    }

    // #Aspects:
    // Moon square Mars
    // ......
    const aspects = new Array<string>();
    for (let i = 0; i < natalChart.phase.length; i++) {
      const aspect = natalChart.phase[i];
      let aspectName = aspect.aspect_name.toLowerCase();
      if ('opposition' == aspectName) {
        aspectName = 'oppose';
      }
      aspects.push(
        `${aspect.planet_name_1} ${aspectName} ${aspect.planet_name_2}`
      );
    }

    this._profile.natalChartStr =
      signs.join('\n') + '\n' + houses.join('\n') + '\n' + aspects.join('\n');
  }
}
