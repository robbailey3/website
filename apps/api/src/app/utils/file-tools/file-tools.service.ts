import { Injectable } from '@nestjs/common';
import * as fse from 'fs-extra';

@Injectable()
export class FileToolsService {
  public ensureDir(
    path: string,
    options: fse.EnsureOptions = {}
  ): Promise<void> {
    return fse.ensureDir(path, options);
  }
}
