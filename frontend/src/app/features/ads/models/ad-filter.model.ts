export interface AdFilter{

  categoryId: number | null;

  city: string;
  country: string;

  minPrice: number | null;
  maxPrice: number | null;

  gender: "MALE" | "FEMALE" | "UNKNOWN" | null;

  vaccinated: boolean | null;
  chipped: boolean | null;
  neutered: boolean | null;

  searchText: string;


}
