import { Restaurant } from '../models/restaurant.model';

const restaurantMocks: Restaurant[] = [
  {
    id: 'asd',
    img: 'path/to/image',
    name: 'best restaurant 1',
    commentsDisabled: false,
    comments: [
      {
        id: '23',
        name: 'Omer',
        brief: 'This restaurant was great!',
        description:
          'Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! ',
        date: '2020-12-15T00:29:28.395Z',
      },
      {
        id: '2',
        name: 'Ron',
        brief: 'I really enjoyed this restaurant!',
        description:
          'Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! ',
        date: '2020-12-19T00:29:55.421Z',
      },
    ],
  },
  {
    id: 'asdsd',
    img: 'path/to/image',
    name: 'best restaurant 2',
    commentsDisabled: true,
    comments: [
      {
        id: '345o982',
        name: 'Tom',
        brief: 'I Recommand this place',
        description:
          'Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! ',
        date: '2020-12-16T00:29:55.421Z',
      },
    ],
  },
  {
    id: 'asdasda',
    img: 'path/to/image',
    name: 'best restaurant 3',
    commentsDisabled: false,
    comments: [],
  },
  {
    id: 'asxcvd',
    img: 'path/to/image',
    name: 'best restaurant 1',
    commentsDisabled: false,
    comments: [],
  },
];

export default restaurantMocks;
