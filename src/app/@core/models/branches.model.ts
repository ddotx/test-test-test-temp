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
  next_page_url?: any;
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
  id: number;
  title: string;
  image_cover_url: string;
  email?: any;
  phone: string;
  mobile?: string;
  fax?: string;
  detail?: string;
  detail_short?: string;
  location_title?: string;
  location_latitude: string | number;
  location_longitude: string | number;
  location_max_distance?: any;
  address_full: string;
  address_title?: string;
  address_number?: string;
  address_street?: string;
  address_tambon?: string;
  address_amphoe: string;
  address_province: string;
  address_postal_code: string;
  tags?: any;
  meta_title?: any;
  meta_description?: any;
  is_enable: number;
  status: number;
  created_at: string;
  updated_at: string;
  distance_meter?: number;
  nearby: Nearby;
  data_working_day_time_is_enable: Dataworkingdaytimeisenable;
  date_working_day_time: string;
  data_working_day: Dataworkingday[];
}

export interface Dataworkingdaytimeisenable {
  is_enable: boolean;
  color: string;
  is_name: string;
}

export interface Dataworkingday {
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
