import React from "react";
import Link from "next/link";

import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ItemCounter } from "../ui";

import { useCartContext } from "@/context/cart";
import { ICartProduct, IOrderItem } from "@/interfaces";

interface Props {
  editable?: boolean;
  cart?: IOrderItem[];
}

export const CartList: React.FC<Props> = ({ editable, cart }) => {
  const {
    cart: cartStore,
    updateQuantityProductCart,
    removeProductInCart,
  } = useCartContext();

  const updateQuantity = (quantity: number, product: ICartProduct) => {
    const newProduct = { ...product, quantity };
    updateQuantityProductCart(newProduct);
  };

  const removeProduct = (product: ICartProduct) => {
    removeProductInCart(product);
  };

  const cartToShow = cart ? cart : cartStore;

  return (
    <>
      {cartToShow.map((product) => (
        <Grid
          container
          spacing={2}
          key={`${product.slug}-${product.size}`}
          sx={{ mb: 1 }}
        >
          <Grid item xs={3}>
            {/* TODO: llevar a la página del producto */}
            <Link href={`/product/${product.slug}`}>
              <CardActionArea>
                <CardMedia
                  image={`/products/${product.image}`}
                  component="img"
                  sx={{ borderRadius: "5px" }}
                />
              </CardActionArea>
            </Link>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  max={10}
                  updateQuantity={(value) =>
                    updateQuantity(value, product as ICartProduct)
                  }
                />
              ) : (
                <Typography variant="h5">3 items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="subtitle1">{`$${
              product.price * product.quantity
            }`}</Typography>

            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeProduct(product as ICartProduct)}
              >
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};
