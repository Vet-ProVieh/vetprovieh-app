import {BaseRepository} from '@tomuench/vetprovieh-shared/lib';
import {Barn} from '../models/barn';

export class BarnsRepository extends BaseRepository<Barn> {
  constructor() {
    super('/service/barns');
  }
}
