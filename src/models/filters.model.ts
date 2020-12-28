import { Areas } from './area.model';

export interface FilterFields {
  category: string;
  area: Areas;
  description: string;
  minRating: number;
}

export const getInitialFilters = (): FilterFields => ({
  category: '',
  area: Areas.None,
  description: '',
  minRating: 1,
});
