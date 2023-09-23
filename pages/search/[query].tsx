import React from "react";
import { GetServerSideProps } from "next";

import { Box, Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";

import { dbProduct } from "@/database";
import { IProduct } from "@/interfaces";

interface Props {
  foundProducts: boolean;
  query: string;
  products: IProduct[];
}

const SearchPage: React.FC<Props> = ({ query, products, foundProducts }) => {
  return (
    <ShopLayout
      title="Teslo-Shop - Search"
      pageDescription="Encuentra los mejores productos de Teslo aqui"
    >
      <Typography variant="h1" component="h1">
        Buscar producto
      </Typography>
      {foundProducts ? (
        <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
          {query}
        </Typography>
      ) : (
        <Box display="flex">
          <Typography variant="h2" sx={{ mb: 1 }}>
            No encontramos ningún producto
          </Typography>
          <Typography
            variant="h2"
            sx={{ ml: 1 }}
            color="secondary"
            textTransform="capitalize"
          >
            {query}
          </Typography>
        </Box>
      )}
      <ProductList products={products} />
    </ShopLayout>
  );
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  let products = await dbProduct.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProduct.getAllProduct();
  }

  return {
    props: {
      foundProducts,
      products,
      query,
    },
  };
};
