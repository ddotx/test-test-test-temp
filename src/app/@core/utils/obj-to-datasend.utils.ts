import { DataSend } from '../models/data-send.model';

export function objToDataSend(obj:any | {}): DataSend[] {
  return Object.keys(obj).map((key) => ({
    params_title: key,
    params_data: obj[key],
  }));
}
