import { ObjectId } from 'mongodb';

export class PhotoAlbumDto {
  public _id: ObjectId;

  public name: string;
}
