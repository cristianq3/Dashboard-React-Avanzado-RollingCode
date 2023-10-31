import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker/locale/es";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// sections
import {
  AppOrderTimeline,
  AppCurrentVisits,
  AppConversionRates,
} from "../sections/@dashboard/app";

import SalesChart from "../sections/@dashboard/app/SalesChart";
import useSales from "../hooks/useSales";
import { SalesDataTable } from "../components/data-table/SalesDataTable";
import SalesByProductChart from "../components/chart/SalesByProductChart";
import YearlySalesChart from "../components/chart/YearlySalesChart";
import { useState } from "react";

// ----------------------------------------------------------------------

export default function SalesPage() {
  const theme = useTheme();
  const [marginTable, setMarginTable] = useState(0);

  return (
    <>
      <Helmet>
        <title> Sales | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Ventas
        </Typography>
        <Grid
          container
          spacing={3}
          justifyContent={"center"}
          marginBottom={marginTable}
          style={{ height: "100%" }}
        >
          <Grid item xs={12}>
            <SalesDataTable
              setMarginTable={setMarginTable}
              marginTable={marginTable}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} justifyContent={"center"}>
          <Grid item xs={12} md={6} lg={8}>
            <SalesChart />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SalesByProductChart
              title="Ventas por producto"
              subheader="Este gráfico muestra los productos más populares en tu catálogo."
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={10} lg={10} justifyContent={"center"}>
            <YearlySalesChart title="Ventas del año" />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
