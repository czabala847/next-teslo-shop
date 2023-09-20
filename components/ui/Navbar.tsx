import React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
} from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            color: "black",
          }}
          href="/"
        >
          <Typography variant="h6">Teslo</Typography>
          <Typography sx={{ ml: 0.5 }}>| Shop</Typography>
        </Link>

        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Link href="/category/men">
            <Button>Hombres</Button>
          </Link>
          <Link href="/category/women">
            <Button>Mujeres</Button>
          </Link>
          <Link href="/category/kid">
            <Button>Niños</Button>
          </Link>
        </Box>

        <Box>
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <Link href="/">
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>

          <Button>Menú</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
