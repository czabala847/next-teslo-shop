import React from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";
import { useCartContext } from "@/context/cart";

const SummaryPage = () => {
  const { shippingAdress, cart } = useCartContext();

  return (
    <ShopLayout
      title="Resumen de orden"
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component="h1">
        Resumen de la orden
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen{" "}
                {`${cart.length} ${cart.length > 1 ? "productos" : "producto"}`}
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <Link href="/checkout/address">Editar</Link>
              </Box>

              {shippingAdress && (
                <>
                  <Typography>{`${shippingAdress.firstName} ${shippingAdress.lastName}`}</Typography>
                  <Typography>
                    {shippingAdress.address}{" "}
                    {shippingAdress.address2
                      ? `, ${shippingAdress.address2}`
                      : ""}
                  </Typography>
                  <Typography>
                    {shippingAdress.city}, {shippingAdress.zip}
                  </Typography>
                  <Typography>{shippingAdress.country}</Typography>
                  <Typography>{shippingAdress.phone}</Typography>
                </>
              )}

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <Link href="/cart">Editar</Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
