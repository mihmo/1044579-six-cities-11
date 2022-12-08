import { Comment } from '../types/comment';

export const comments: Comment[] = [
  {
    'id': 1,
    'user': {
      'id': 11,
      'isPro': true,
      'name': 'Ivan',
      'avatarUrl': 'https://11.react.pages.academy/static/avatar/9.jpg'
    },
    'rating': 1,
    'message': 'The room was spacious and clean. 1',
    'date': '2022-10-03T13:58:46.511Z'
  },
  {
    'id': 2,
    'user': {
      'id': 12,
      'isPro': false,
      'name': 'Petr',
      'avatarUrl': 'https://11.react.pages.academy/static/avatar/8.jpg'
    },
    'rating': 2,
    'message': 'The room was spacious and clean. 2',
    'date': '2022-10-08T13:58:46.511Z'
  },
  {
    'id': 3,
    'user': {
      'id': 13,
      'isPro': true,
      'name': 'Olga',
      'avatarUrl': 'https://11.react.pages.academy/static/avatar/7.jpg'
    },
    'rating': 3,
    'message': 'The room was spacious and clean. 3',
    'date': '2022-10-08T13:58:46.511Z'
  },
  {
    'id': 4,
    'user': {
      'id': 14,
      'isPro': false,
      'name': 'Ksenia',
      'avatarUrl': 'https://11.react.pages.academy/static/avatar/6.jpg'
    },
    'rating': 4,
    'message': 'The room was spacious and clean. 4',
    'date': '2022-10-08T13:58:46.511Z'
  },
  {
    'id': 5,
    'user': {
      'id': 15,
      'isPro': false,
      'name': 'Petr',
      'avatarUrl': 'https://11.react.pages.academy/static/avatar/5.jpg'
    },
    'rating': 5,
    'message': 'The room was spacious and clean. 5',
    'date': '2022-10-08T13:58:46.511Z'
  }
];
