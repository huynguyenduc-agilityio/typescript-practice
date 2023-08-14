export interface Product {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  stockCount: number;
  createAt: string;
  totalSold: number;
}

export interface ProductCart extends Product {
  quantity: number;
}
