import {Image} from './image.model';
import {Location} from './location.model';


export interface AnimalAd{
  id: number;
  title: string;
  description: string;
  price: number;

  //location: Location;

  city: string;
  country: string;

  birthDate: string;
  age: number;

  weight: number;

  gender: "MALE" | "FEMALE" | "UNKNOWN";

  vaccinated: boolean;
  chipped: boolean;
  neutered: boolean;

  status: "ACTIVE" | "RESERVED" | "SOLD" | "INACTIVE";

  createdAt: string;
  updatedAt: string;

  viewCount?: number;

  categoryId: number;
  categoryName: string;

  username: string;

  images: Image[];
}
