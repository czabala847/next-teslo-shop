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
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  SearchOutlined,
  VpnKeyOutlined,
} from "@mui/icons-material";
import { useUiContext } from "@/context/ui";

export const SideMenu = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const { isMenuOpen, toggleSideMenu } = useUiContext();

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    navigateTo(`/search/${searchTerm}`);
  };

  const navigateTo = (url: string) => {
    console.log(isMenuOpen);
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

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              <ListItemText primary={"Perfil"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              <ListItemText primary={"Mis Ordenes"} />
            </ListItemButton>
          </ListItem>

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

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <VpnKeyOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ingresar"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LoginOutlined />
              </ListItemIcon>
              <ListItemText primary={"Salir"} />
            </ListItemButton>
          </ListItem>

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CategoryOutlined />
              </ListItemIcon>
              <ListItemText primary={"Productos"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ConfirmationNumberOutlined />
              </ListItemIcon>
              <ListItemText primary={"Ordenes"} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AdminPanelSettings />
              </ListItemIcon>
              <ListItemText primary={"Usuarios"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};
