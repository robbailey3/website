import { ObjectId } from 'mongodb';
import { BaseEntity } from '../../shared/base-entity/base-entity';

interface Dimensions {
  width: number;
  height: number;
}

interface Binary {
  base64: string;
  subType: string;
}

interface ExifVersion {
  $binary: Binary;
}

interface Gps {
  GPSVersionID: number[];
  GPSAltitudeRef: number;
  GPSSatellites: string;
  GPSStatus: string;
  GPSMapDatum: string;
}

interface Image {
  Make: string;
  Model: string;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: number;
  Software: string;
  ModifyDate: Date;
  Artist: string;
  YCbCrSubSampling: number[];
  ExifOffset: number;
  GPSInfo: number;
}

interface Thumbnail {
  Compression: number;
  XResolution: number;
  YResolution: number;
  ResolutionUnit: number;
  ThumbnailOffset: number;
  ThumbnailLength: number;
}

export interface Exif {
  '36880': string;
  ExposureTime: number;
  FNumber: number;
  ExposureProgram: number;
  ISO: number;
  SensitivityType: number;
  RecommendedExposureIndex: number;
  ExifVersion: ExifVersion;
  DateTimeOriginal: Date;
  DateTimeDigitized: Date;
  ShutterSpeedValue: number;
  ApertureValue: number;
  ExposureBiasValue: number;
  MaxApertureValue: number;
  MeteringMode: number;
  Flash: number;
  FocalLength: number;
  SubSecTimeOriginal: string;
  SubSecTimeDigitized: string;
  ColorSpace: number;
  PixelXDimension: number;
  PixelYDimension: number;
  FocalPlaneXResolution: number;
  FocalPlaneYResolution: number;
  FocalPlaneResolutionUnit: number;
  CustomRendered: number;
  ExposureMode: number;
  WhiteBalance: number;
  SceneCaptureType: number;
  ImageUniqueID: string;
  BodySerialNumber: string;
  LensSpecification: Array<number | null>;
  LensModel: string;
  LensSerialNumber: string;
}

export interface Meta {
  image: Image;
  thumbnail: Thumbnail;
  exif: Exif;
  gps: Gps;
}

export class PhotoDto extends BaseEntity {
  public _id: ObjectId;

  public albumId: ObjectId;

  public src: string;

  public thumbnailSrc: string;

  public caption: string;

  public alt: string;

  public imageDimensions: Dimensions;

  public thumbnailDimensions: Dimensions;

  public size: number;

  public thumbnailSize: number;

  public encoding: string;

  public mimeType: string;

  public meta: Partial<Meta> | Meta | null;
}
