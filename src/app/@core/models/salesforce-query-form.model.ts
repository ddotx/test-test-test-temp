export interface DomeinApi {
  ok: number;
  data: Data;
}

export interface Data {
  service_array: Servicearray[];
  branch_array: Servicearray[];
  info_array: Servicearray[];
}

export interface Servicearray {
  id: string;
  name: string;
  sort_index: number;
  value?: string;
  mask?: string;
  required?: Boolean;
  validators?: any;
  column?: string;
  is_display?: Boolean;
  replace?: any;
  display?: Boolean;
}
