import { getProducts } from "@/lib/providers/products";
import Link from "next/link";

export default async function Home() {
  const { products } = await getProducts({ take: 5 });
  return (
    <main className="container">
      <div className="my-6 flex flex-wrap gap-6 justify-center">
        {products.items?.map((product) => (
          <div key={product.id} className="bg-slate-900 rounded-lg p-6 text-slate-300">
            {product.name}
          </div>
        ))}
      </div>
      <Link
        href="https://github.com/parkashay/nextjs-graphql-starter"
        className="my-6 flex flex-col items-center gap-1 flex-wrap bg-yellow-600 w-fit mx-auto p-3 rounded-lg"
        target="_blank"
      >
        <Star />
        <span>Star the repo in github</span>
        <Goto />
      </Link>
    </main>
  );
}

function Star() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
      />
    </svg>
  );
}

function Goto() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}
