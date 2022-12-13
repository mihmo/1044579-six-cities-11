import { lorem, datatype, address, image, internet } from 'faker';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { ResponseAuthData } from '../types/auth-data';

const makeFakeRoomInfo = (): Offer => ({
  bedrooms: datatype.number(10),
  description: lorem.words(),
  goods: datatype.array(datatype.number(10)),
  host: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: lorem.word(),
  },
  id: datatype.number(),
  images: [image.imageUrl()],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude:  Number(address.longitude()),
    zoom: datatype.number(10),
  },
  maxAdults: datatype.number(10),
  previewImage: image.imageUrl(),
  price: datatype.number(5000),
  rating: datatype.number(5),
  title: lorem.words(),
  type: lorem.word(),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude:  Number(address.longitude()),
      zoom: datatype.number(10),
    },
    name: address.cityName(),
  }
} as Offer);

export const fakeRoomInfo = makeFakeRoomInfo();

export const makeFakeOffers = (): Offer[] => {
  const offers = [];
  for (let i = 0; i < datatype.number(10); i++) {
    offers.push(makeFakeRoomInfo());
  }
  offers.push(fakeRoomInfo);
  return offers;
};

export const makeFakeNearbyOffers = (): Offer[] => {
  const nearbyoffers : Offer[] = [];
  for (let i = 0; i < datatype.number(3); i++) {
    nearbyoffers.push(makeFakeRoomInfo());
  }
  nearbyoffers.push(fakeRoomInfo);
  return nearbyoffers;
};

export const makeFakeFavoriteOffers = (): Offer[] => {
  const favoriteOffers : Offer[] = [];
  for (let i = 0; i < datatype.number(5); i++) {
    favoriteOffers.push(makeFakeRoomInfo());
  }
  return favoriteOffers;
};

export const makeFakeComment = (): Comment => ({
  comment: lorem.paragraph(),
  date: String(datatype.datetime()),
  id: datatype.number(),
  rating: datatype.number(5),
  user: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name:  lorem.word(),
  }
} as Comment);

export const makeFakeComments = (): Comment[] => {
  const comments : Comment[] = [];
  for (let i = 0; i < datatype.number(10); i++) {
    comments.push(makeFakeComment());
  }
  return comments;
};

export const makeFakeAuthUser = (): string => internet.email();
