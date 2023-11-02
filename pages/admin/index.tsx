import { AdminLayout } from "@/components/layouts";
import { DashboardOutlined } from "@mui/icons-material";
import React from "react";

const DashboardPage = () => {
  return (
    <AdminLayout
      subTitle="Estadisticas generales"
      title="Dashboard"
      icon={<DashboardOutlined />}
    >
      <h3>Hola mundo</h3>
    </AdminLayout>
  );
};

export default DashboardPage;
