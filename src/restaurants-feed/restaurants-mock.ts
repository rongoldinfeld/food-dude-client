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
        data: 'This restaurant was great!',
      },
      {
        id: '2',
        name: 'Ron',
        data: 'I really enjoyed this restaurant!',
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
        data: 'I Recommand this place',
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
