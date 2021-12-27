export interface DomeinApi {
  ok: number;
  data: Data;
}

export interface Data {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface Link {
  url?: string;
  label: number | string;
  active: boolean;
}

export interface Datum {
  position?: Position;
  id?: number;
  title?: string;
  image_cover_url?: string;
  email?: any;
  phone?: string;
  mobile?: any;
  fax?: any;
  detail?: any;
  detail_short?: any;
  location_title?: any;
  location_latitude?: string;
  location_longitude?: string;
  location_max_distance?: any;
  address_full?: string;
  address_title?: any;
  address_number?: any;
  address_street?: any;
  address_tambon?: string;
  address_amphoe?: string;
  address_province: string;
  address_postal_code?: string;
  tags?: any;
  is_enable?: number;
  status?: number;
  created_at?: string;
  updated_at?: string;
  nearby?: Nearby;
  date_time?: string;
  data_open?: boolean;
  data_working_day?: Dataworkingday[];
}

interface Position {
  lat?: number;
  lng?: number;
}

interface Dataworkingday {
  day_index: number;
  day_name: string;
  open_time: string;
  close_time: string;
  enable: number;
}

export interface Nearby {
  distance_meter: number;
  distance_text: string;
  duration_minute: number;
  duration_text: string;
}
