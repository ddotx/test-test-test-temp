export interface ICarsBrands {
  ok: number;
  data: IDataCarsBrands[];
  cache: boolean;
}

export interface IDataCarsBrands {
  id: number;
  name: string;
  description?: string;
  logo_image_url?: string;
  banners: Banner[];
  tires: Tire[];
}

export interface Tire {
  size: string;
}

export interface Banner {
  index: number;
  image_url: string;
  description: string;
}

export interface ICarsClasses {
  ok: number;
  data: IDataCarsClasses[];
}

export interface IDataCarsClasses {
  class: string;
}

export interface ICarsModels {
  ok: number;
  data: IDataCarsModels[];
}

export interface IDataCarsModels {
  model: string;
}

export interface ICarsYears {
  ok: number;
  data: IDataCarsYears[];
}

export interface IDataCarsYears {
  year: string;
}
