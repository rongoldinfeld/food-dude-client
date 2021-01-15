import { Review } from './review.model';
export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  rating: number;
  imageUrl: string;
  address: {
    city: string;
    street: string;
    houseNumber: number;
  };
  category: string;
  reviews: Review[];
  reviewsBlocked: boolean;
}
