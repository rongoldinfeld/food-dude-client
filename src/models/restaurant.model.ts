export interface Restaurant {
  id: string;
  name: string;
  img: string;
  comments?: {
    name: string;
    data: string;
  }[];
}
