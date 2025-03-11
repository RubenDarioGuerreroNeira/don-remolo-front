export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stockIn: number;
}

export interface CategoryGroup {
  category: string;
  items: Product[];
}
