export interface Restaurant {
  id: string;
  name: string;
  img: string;
  comments?: {
    id: string;
    name: string;
    data: string;
  }[];
}
