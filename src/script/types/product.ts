export interface Product {
  id: string | number;
  image: string;
  name: string;
  description: string;
  price: number;
  stockCount: number;
  createAt: string;
  totalSold: number;
}
