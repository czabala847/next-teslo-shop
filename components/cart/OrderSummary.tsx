import React from "react";
import { Grid, Typography } from "@mui/material";

import { useCartContext } from "@/context/cart";

interface Props {
  numberOfItems?: number;
  total?: number;
  subTotal?: number;
  tax?: number;
}

export const OrderSummary: React.FC<Props> = ({
  numberOfItems,
  subTotal,
  tax,
  total,
}) => {
  const cartContext = useCartContext();

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems ? numberOfItems : cartContext.numberOfItems} items
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${
          subTotal ? subTotal : cartContext.subTotal
        }`}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${tax ? tax : cartContext.tax}`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{`$${
          total ? total.toFixed(0) : cartContext.total.toFixed(0)
        }`}</Typography>
      </Grid>
    </Grid>
  );
};
