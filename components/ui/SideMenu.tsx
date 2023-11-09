import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useUiContext } from "@/context/ui";
import { useAuthContext } from "@/context/auth";

export const SideMenu = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useUiContext();
  const { user, isLoggedIn, logout } = useAuthContext();

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    toggleSideMenu();
    router.push(url);
  };

  return (
    <Drawer
      onClose={toggleSideMenu}
      open={isMenuOpen}
      anchor="right"
      sx={{ backdropFilter: "blur(4px)", transition: "all 0.5s ease-out" }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              autoFocus
              value={searchTerm}
              onKeyDown={({ key }) => key === "Enter" && onSearchTerm()}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={onSearchTerm}>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {isLoggedIn && (
            <>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AccountCircleOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Perfil"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={() => navigateTo("/orders/history")}>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Mis Ordenes"} />
                </ListItemButton>
              </ListItem>
            </>
          )}

          <ListItem disablePadding sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemButton onClick={() => navigateTo("/category/men")}>
              <ListItemIcon>
                <MaleOutlined />
              </ListItemIcon>
              <ListItemText primary={"Hombres"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemButton onClick={() => navigateTo("/category/women")}>
              <ListItemIcon>
                <FemaleOutlined />
              </ListItemIcon>
              <ListItemText primary={"Mujeres"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: { xs: "", sm: "none" } }}>
            <ListItemButton onClick={() => navigateTo("/category/kid")}>
              <ListItemIcon>
                <EscalatorWarningOutlined />
              </ListItemIcon>
              <ListItemText primary={"Niños"} />
            </ListItemButton>
          </ListItem>

          {isLoggedIn ? (
            <ListItem disablePadding onClick={logout}>
              <ListItemButton>
                <ListItemIcon>
                  <LoginOutlined />
                </ListItemIcon>
                <ListItemText primary={"Salir"} />
              </ListItemButton>
            </ListItem>
          ) : (
            <ListItem
              disablePadding
              onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}
            >
              <ListItemButton>
                <ListItemIcon>
                  <VpnKeyOutlined />
                </ListItemIcon>
                <ListItemText primary={"Ingresar"} />
              </ListItemButton>
            </ListItem>
          )}

          {user && user.role === "admin" && (
            <>
              {/* Admin */}
              <Divider />
              <ListSubheader>Admin Panel</ListSubheader>

              <ListItem disablePadding onClick={() => navigateTo("/admin")}>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding onClick={() => navigateTo("/admin/products")}>
                <ListItemButton>
                  <ListItemIcon>
                    <CategoryOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Productos"} />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                onClick={() => navigateTo("/admin/orders")}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ConfirmationNumberOutlined />
                  </ListItemIcon>
                  <ListItemText primary={"Ordenes"} />
                </ListItemButton>
              </ListItem>

              <ListItem
                disablePadding
                onClick={() => navigateTo("/admin/users")}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <AdminPanelSettings />
                  </ListItemIcon>
                  <ListItemText primary={"Usuarios"} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Box>
    </Drawer>
  );
};
