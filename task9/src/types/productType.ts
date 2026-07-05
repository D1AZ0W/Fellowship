export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: "men's clothing" | "women's clothing" | "electronics" | "jewelery";
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
