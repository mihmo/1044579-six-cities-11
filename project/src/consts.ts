export enum AppRoute {
  Default = '/',
  Login = '/login',
  Main = '/:city',
  Favorites = '/favorites',
  Property = '/:city/offer/:id',
  Error = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum MapStyle {
  Main = 'Main__map',
  Room = 'Room__map',
}

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const defaultCityCoordinates = {
  'name': 'Amsterdam',
  'location': {
    'latitude': 52.37454,
    'longitude': 4.897976,
    'zoom': 13
  },
} as const;

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
  Offers = '/hotels',
  NearbyOffers = '/nearby',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}
