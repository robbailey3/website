import { BaseEntityDto } from '../shared/dto/base-entity.dto';

export const AddDateModified = (field: BaseEntityDto): BaseEntityDto => {
  // eslint-disable-next-line no-param-reassign
  field.dateModified = new Date();
  return field;
};
