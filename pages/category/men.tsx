import React from "react";
import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { FullScreenLoading } from "@/components/ui";
import { ProductList } from "@/components/products";

import { useProducts } from "@/hooks";

const MenPage = () => {
  const { isLoading, products } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title="Teslo-Shop - Hombre"
      pageDescription="Encuentra los mejores productos de Teslo para hombres aqui"
    >
      <Typography variant="h1" component="h1">
        Hombres
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para hombres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
