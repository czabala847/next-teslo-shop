import React from "react";
import Link from "next/link";
import {
  Chip,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
} from "@mui/material";
import { CreditScoreOutlined } from "@mui/icons-material";

import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";

const OrderPage = () => {
  return (
    <ShopLayout
      title="Resumen de la orden 123671523"
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component="h1">
        Orden: ABC123
      </Typography>

      {/* <Chip 
            sx={{ my: 2 }}
            label="Pendiente de pago"
            variant='outlined'
            color="error"
            icon={ <CreditCardOffOutlined /> }
        /> */}
      <Chip
        sx={{ my: 2 }}
        label="Orden ya fue pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <Link href="/checkout/address">Editar</Link>
              </Box>

              <Typography>Fernando Herrera</Typography>
              <Typography>323 Algun lugar</Typography>
              <Typography>Stittsville, HYA 23S</Typography>
              <Typography>Canadá</Typography>
              <Typography>+1 23123123</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <Link href="/cart">Editar</Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                {/* TODO */}
                <h1>Pagar</h1>

                <Chip
                  sx={{ my: 2 }}
                  label="Orden ya fue pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
