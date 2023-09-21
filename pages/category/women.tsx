import React from "react";
import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";

import { useProducts } from "@/hooks";

const WomenPage = () => {
  const { isLoading, products } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title="Teslo-Shop - Mujer"
      pageDescription="Encuentra los mejores productos de Teslo para mujeres aqui"
    >
      <Typography variant="h1" component="h1">
        Mujeres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para mujeres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default WomenPage;
