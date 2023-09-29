import { useCartContext } from "@/context/cart";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { useMemo } from "react";

const iva = 0.15;

export const OrderSummary = () => {
  const { cart } = useCartContext();

  const total = useMemo(
    () =>
      cart.reduce(
        (accumulator, current) =>
          accumulator + current.price * current.quantity,
        0
      ),
    [cart]
  );

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{cart.length} items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${total}`}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${total * iva}`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
        <Typography variant="subtitle1">{`$${total + total * iva}`}</Typography>
      </Grid>
    </Grid>
  );
};
