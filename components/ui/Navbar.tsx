import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
import { useUiContext } from "@/context/ui";

export const Navbar = () => {
  const router = useRouter();
  const { toggleSideMenu } = useUiContext();

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
            <Button
              color={router.pathname === "/category/men" ? "secondary" : "info"}
            >
              Hombres
            </Button>
          </Link>
          <Link href="/category/women">
            <Button
              color={
                router.pathname === "/category/women" ? "secondary" : "info"
              }
            >
              Mujeres
            </Button>
          </Link>
          <Link href="/category/kid">
            <Button
              color={router.pathname === "/category/kid" ? "secondary" : "info"}
            >
              Niños
            </Button>
          </Link>
        </Box>

        <Box>
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <Link href="/cart">
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>

          <Button onClick={toggleSideMenu}>Menú</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
