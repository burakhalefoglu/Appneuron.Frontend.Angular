import { RetentionRawDataModel } from './retention-raw-data-model';

export class RetentionDataWithSessionDto {
  minSession: Date;
  maxSession: Date;
  retentionRawDataModel: RetentionRawDataModel[];
}
