export type ProductType = {
  _id: string;

  name: string;
  description: string;

  ingredients: {
    _id: string;
    name: string;
  }[];

  category: {
    _id: string;
    name: string;
  }[];

  goal: {
    _id: string;
    name: string;
  }[];

  price: number;
  dosage: string;
  image?: string;
  images?: string[];

  createdAt: Date;
  updatedAt: Date;
};