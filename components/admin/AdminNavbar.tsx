import Link from "next/link";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { useUiContext } from "@/context/ui";

export const AdminNavbar = () => {
  const { toggleSideMenu } = useUiContext();

  return (
    <AppBar>
      <Toolbar>
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

        <Box flex={1} />

        <Button onClick={toggleSideMenu}>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};
