import { ObjectId } from 'mongodb';
import { BaseEntity } from '../../shared/base-entity/base-entity';

export class PhotoAlbumDto extends BaseEntity {
  public _id: ObjectId;

  public name: string;
}
