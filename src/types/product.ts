export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string | Category;
  stockIn: number;
}

export interface CategoryGroup {
  category: string;
  items: Product[];
}

export interface Category {
  id: string;
  name: string;
  products: Product[];
}
