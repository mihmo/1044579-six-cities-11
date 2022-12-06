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
    'comment': 'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
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
    'comment': 'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
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
    'comment': 'The house is very good, very happy, hygienic and simple living conditions around it are also very good. I hope to have the opportunity to come back. Thank you.',
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
    'comment': 'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
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
    'comment': 'I stayed here for one night and it was an unpleasant experience.',
    'date': '2022-10-08T13:58:46.511Z'
  }
];
