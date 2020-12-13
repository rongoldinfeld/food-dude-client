import { Comment } from './comment.model';
export interface Restaurant {
  id: string;
  name: string;
  img: string;
  comments?: Comment[];
}
