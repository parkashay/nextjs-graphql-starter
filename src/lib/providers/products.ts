"use server";

import { ProductListOptions, ProductsDocument } from "@/generated/graphql";
import { fetcher } from "../fetcher";

export const getProducts = async (options: ProductListOptions) =>
  await fetcher({ document: ProductsDocument, variables: { options } });
