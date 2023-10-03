import React, { useState } from "react";
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
  Input,
  InputAdornment,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { useUiContext } from "@/context/ui";
import { useCartContext } from "@/context/cart";

export const Navbar = () => {
  const router = useRouter();
  const { toggleSideMenu } = useUiContext();
  const { cart } = useCartContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    router.push(`/search/${searchTerm}`);
  };

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

        <Box display="flex">
          {/* Pantallas pantallas grandes */}
          {isSearchVisible ? (
            <Input
              sx={{ display: { xs: "none", md: "flex" } }}
              className="fadeIn"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={({ key }) => (key === "Enter" ? onSearchTerm() : null)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setIsSearchVisible(false)}>
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              onClick={() => setIsSearchVisible(true)}
              className="fadeIn"
              sx={{ display: { xs: "none", md: "flex" } }}
            >
              <SearchOutlined />
            </IconButton>
          )}

          {/* Pantallas pequeñas */}
          <IconButton
            sx={{ display: { xs: "flex", sm: "none" } }}
            onClick={toggleSideMenu}
          >
            <SearchOutlined />
          </IconButton>

          <Link href="/cart">
            <IconButton>
              <Badge
                badgeContent={cart.length > 9 ? "+9" : cart.length}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>

          <Button onClick={(e) => e.detail > 0 && toggleSideMenu()}>
            Menú
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
