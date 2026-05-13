import {Image} from './image.model';


export interface AnimalAd{
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  createdAt: string;
  categoryId: number;
  categoryName: string;

  username: string;

  images: Image[];
}
