export interface IName {
  title: string;
  first: string;
  last: string;
}

export interface ICoordinates {
  latitude: string;
  longitude: string;
}

export interface ITimezone {
  offset: string;
  description: string;
}

export interface ILocation {
  street: IStreet;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: ICoordinates;
  timezone: ITimezone;
}

export interface IStreet {
  number: number;
  name: string;
}

export interface ILogin {
  uuid: string;
  username: string;
  password: string
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface IDob {
  date: string;
  age: string | number;
}

export interface IRegistered {
  date: string;
  age: number
}

export interface IId {
  name: string;
  value: number;
}

export interface IPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface IInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface IResult {
  gender: string,
  name: IName
  location: ILocation;
  email: string;
  login: ILogin;
  dob: IDob;
  registered: IRegistered;
  phone: string;
  cell: string;
  id: IId;
  picture: IPicture;
  nat: string;
}

export interface IUserInfo {
  results: IResult[];
  info: IInfo;
}

export interface IGetAllUsersResponseError {
  statusCode?: number;
  error?: string;
  message?: string;
}
