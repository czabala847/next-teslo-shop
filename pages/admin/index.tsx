import React from "react";
import { Grid } from "@mui/material";
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";

import { AdminLayout } from "@/components/layouts";
import { SummaryTile } from "@/components/admin";

const DashboardPage = () => {
  return (
    <AdminLayout
      subTitle="Estadisticas generales"
      title="Dashboard"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          // title={ numberOfOrders }
          title={0}
          subTitle="Ordenes totales"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          // title={ paidOrders }
          title={0}
          subTitle="Ordenes pagadas"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          // title={ notPaidOrders }
          title={0}
          subTitle="Ordenes pendientes"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          // title={ numberOfClients }
          title={0}
          subTitle="Clientes"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          // title={ numberOfProducts }
          title={0}
          subTitle="Productos"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          // title={ productsWithNoInventory }
          title={0}
          subTitle="Sin existencias"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          // title={ lowInventory }
          title={0}
          subTitle="Bajo inventario"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SummaryTile
          // title={ refreshIn }
          title={0}
          subTitle="Actualización en:"
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
