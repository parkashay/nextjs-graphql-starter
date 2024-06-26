import { getProducts } from "@/lib/providers/products";

export default async function Home() {
  const { products } = await getProducts({ take: 5 });
  return <div>{JSON.stringify(products)}</div>;
}
