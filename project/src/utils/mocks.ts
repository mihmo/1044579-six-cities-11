import { lorem, datatype, address, image, internet } from 'faker';
import { Offer } from '../types/offer';
import { Comment, NewComment } from '../types/comment';

export const makeFakeRoomInfo = (id: number): Offer => ({
  bedrooms: datatype.number(10),
  description: lorem.words(),
  goods: datatype.array(datatype.number(10)),
  host: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: lorem.word(),
  },
  id: id,
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

export const fakeRoomInfo = makeFakeRoomInfo(datatype.number());

export const makeFakeOffers = (): Offer[] => {
  const offers = [];
  for (let i = 0; i < datatype.number(10); i++) {
    offers.push(makeFakeRoomInfo(i));
  }
  offers.push(fakeRoomInfo);
  return offers;
};

export const makeFakeNearbyOffers = (): Offer[] => {
  const nearbyoffers : Offer[] = [];
  for (let i = 0; i < datatype.number(2); i++) {
    nearbyoffers.push(makeFakeRoomInfo(i));
  }
  nearbyoffers.push(fakeRoomInfo);
  return nearbyoffers;
};

export const makeFakeFavoriteOffers = (): Offer[] => {
  const favoriteOffers : Offer[] = [];
  for (let i = 0; i < datatype.number({min: 1, max: 5}); i++) {
    favoriteOffers.push(makeFakeRoomInfo(i));
  }
  return favoriteOffers;
};

export const makeFakeComment = (id: number): Comment => ({
  comment: lorem.paragraph(),
  date: String(datatype.datetime()),
  id: id,
  rating: datatype.number(5),
  user: {
    avatarUrl: image.imageUrl(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name:  lorem.word(),
  }
} as Comment);

export const makeFakeNewComment = (): NewComment => ({
  comment: lorem.paragraph(),
  rating: datatype.number(5),
} as NewComment);


export const makeFakeComments = (): Comment[] => {
  const comments : Comment[] = [];
  for (let i = 0; i < datatype.number(10); i++) {
    comments.push(makeFakeComment(i));
  }
  comments.push(makeFakeComment(fakeRoomInfo.id));
  return comments;
};

export const makeFakeAuthUser = (): string => internet.email();
