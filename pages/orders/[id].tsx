import React from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { getSession } from "next-auth/react";
import {
  Chip,
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
} from "@mui/material";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";
import { dbOrders } from "@/database";
import { ICartProduct, IOrder, IUser } from "@/interfaces";

interface Props {
  order: IOrder;
}

const OrderPage: React.FC<Props> = ({ order }) => {
  const {
    _id,
    isPaid,
    numberOfItems,
    shippingAddress,
    orderItems,
    subTotal,
    tax,
    total,
  } = order;

  async function createOrder(): Promise<string> {
    const response = await fetch("/my-server/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            id: "1",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    });
    const order = await response.json();
    console.log(order.id);
    return order.id;
  }

  async function onApprove(data: any) {
    const response = await fetch("/my-server/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    });
    const orderData = await response.json();
    const name = orderData.payer.name.given_name;

    alert(`Transaction completed by ${name}`);
  }

  return (
    <ShopLayout
      title="Resumen de la orden"
      pageDescription={"Resumen de la orden"}
    >
      <Typography variant="h1" component="h1">
        Orden: {_id}
      </Typography>

      {isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden ya fue pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList cart={orderItems} editable={false} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen {numberOfItems}{" "}
                {numberOfItems > 1 ? "productos" : "producto"}
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
              </Box>

              <Typography>{`${shippingAddress.firstName} ${shippingAddress.lastName}`}</Typography>
              <Typography>
                {shippingAddress.address}{" "}
                {shippingAddress.address2 ? shippingAddress.address2 : ""}{" "}
              </Typography>
              <Typography>
                {shippingAddress.city} {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary
                numberOfItems={numberOfItems}
                subTotal={subTotal}
                tax={tax}
                total={total}
              />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {/* TODO */}

                {isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const { id = "" } = query;

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: false,
      },
    };
  }

  const order = await dbOrders.getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  if (order.user !== (session.user as IUser)._id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};
