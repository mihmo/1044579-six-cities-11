import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37,
        'longitude': 4.87,
        'zoom': 12
      }
    },
    'previewImage': 'https://11.react.pages.academy/static/hotel/1.jpg',
    'images': [
      'https://11.react.pages.academy/static/hotel/2.jpg'
    ],
    'title': 'Beautiful & luxurious studio at great location',
    'isFavorite': true,
    'isPremium': false,
    'rating': 4.6,
    'type': 'apartment',
    'bedrooms': 2,
    'maxAdults': 4,
    'price': 530,
    'goods': ['Fridge', 'Wifi', 'Conditioner'],
    'host': {
      'id': 1,
      'name': 'Angelina',
      'isPro': true,
      'avatarUrl': 'img/avatar-angelina.jpg'
    },
    'description': 'An independent House, strategically located between Rembrand Square and National Opera.',
    'location': {
      'latitude': 52.378,
      'longitude': 4.895,
      'zoom': 14
    },
    'id': 1
  },
  {
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37,
        'longitude': 4.87,
        'zoom': 12
      }
    },
    'previewImage': 'https://11.react.pages.academy/static/hotel/3.jpg',
    'images': [
      'https://11.react.pages.academy/static/hotel/4.jpg'
    ],
    'title': 'Beautiful & luxurious studio',
    'isFavorite': false,
    'isPremium': true,
    'rating': 4.2,
    'type': 'room',
    'bedrooms': 1,
    'maxAdults': 3,
    'price': 325,
    'goods': ['Fridge', 'Dishwasher'],
    'host': {
      'id': 2,
      'name': 'Angel',
      'isPro': true,
      'avatarUrl': 'img/avatar-angelina.jpg'
    },
    'description': 'An independent House.',
    'location': {
      'latitude': 52.381,
      'longitude': 4.899,
      'zoom': 14
    },
    'id': 2
  },
  {
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37,
        'longitude': 4.87,
        'zoom': 12
      }
    },
    'previewImage': 'https://11.react.pages.academy/static/hotel/5.jpg',
    'images': [
      'https://11.react.pages.academy/static/hotel/6.jpg'
    ],
    'title': 'Luxurious studio at great location',
    'isFavorite': true,
    'isPremium': true,
    'rating': 4.1,
    'type': 'house',
    'bedrooms': 3,
    'maxAdults': 5,
    'price': 640,
    'goods': ['Fridge', 'Wifi', 'Towels', 'Conditioner'],
    'host': {
      'id': 1,
      'name': 'Angelina',
      'isPro': true,
      'avatarUrl': 'img/avatar-angelina.jpg'
    },
    'description': 'House strategically located between National Opera.',
    'location': {
      'latitude': 52.328,
      'longitude': 4.855,
      'zoom': 14
    },
    'id': 3
  },
  {
    'city': {
      'name': 'Amsterdam',
      'location': {
        'latitude': 52.37,
        'longitude': 4.87,
        'zoom': 12
      }
    },
    'previewImage': 'https://11.react.pages.academy/static/hotel/7.jpg',
    'images': [
      'https://11.react.pages.academy/static/hotel/8.jpg'
    ],
    'title': 'Wood and stone place',
    'isFavorite': false,
    'isPremium': false,
    'rating': 2.9,
    'type': 'apartment',
    'bedrooms': 2,
    'maxAdults': 5,
    'price': 390,
    'goods': ['Fridge', 'Wifi', 'Dishwasher'],
    'host': {
      'id': 2,
      'name': 'Angelina',
      'isPro': false,
      'avatarUrl': 'img/avatar-angelina.jpg'
    },
    'description': 'An independent Wood and stone place, strategically located near Opera.',
    'location': {
      'latitude': 52.148,
      'longitude': 4.945,
      'zoom': 14
    },
    'id': 4
  },
];
