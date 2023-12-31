import React from "react";
import { Typography } from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { ProductList } from "@/components/products";
import { FullScreenLoading } from "@/components/ui";

import { useProducts } from "@/hooks";

const KidPage = () => {
  const { isLoading, products } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title="Teslo-Shop - Kids"
      pageDescription="Encuentra los mejores productos de Teslo para niños aqui"
    >
      <Typography variant="h1" component="h1">
        Niños
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos para niños
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
