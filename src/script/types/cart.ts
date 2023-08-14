export interface ProductCartItem {
  productId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  itemList: ProductCartItem[];
}
