import { Restaurant } from '../models/restaurant.model';

const restaurantMocks: Restaurant[] = [
  {
    id: 'asd',
    img: 'path/to/image',
    name: 'best restaurant 1',
    comments: [
      {
        id: '23',
        name: 'Omer',
        brief: 'This restaurant was great!',
        description:
          'Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! ',
      },
      {
        id: '2',
        name: 'Ron',
        brief: 'I really enjoyed this restaurant!',
        description:
          'Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! ',
      },
    ],
  },
  {
    id: 'asdsd',
    img: 'path/to/image',
    name: 'best restaurant 2',
    comments: [
      {
        id: '345o982',
        name: 'Tom',
        brief: 'I Recommand this place',
        description:
          'Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! Everything was great!!!! ',
      },
    ],
  },
  {
    id: 'asdasda',
    img: 'path/to/image',
    name: 'best restaurant 3',
  },
  {
    id: 'asxcvd',
    img: 'path/to/image',
    name: 'best restaurant 1',
  },
];

export default restaurantMocks;
