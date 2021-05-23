import { BaseEntityDto } from '../dto/base-entity.dto';

export const AddDateModified = (field: BaseEntityDto): BaseEntityDto => {
  // eslint-disable-next-line no-param-reassign
  field.dateModified = new Date();
  return field;
};
