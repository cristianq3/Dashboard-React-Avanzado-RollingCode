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

// ----------------------------------------------------------------------

export default function SalesPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Sales | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Ventas
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SalesDataTable />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <SalesChart />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Ventas por producto"
              subheader="Este gráfico muestra los productos más populares en tu catálogo."
              chartData={[
                { label: "Remera Nike", value: 4344 },
                { label: "Zapatillas Adidas", value: 5435 },
                { label: "Short Adidas", value: 1443 },
                { label: "Remera Adidas", value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Ventas por mes"
              subheader="(+43%) más que el último año."
              chartData={[
                { label: "Enero", value: 400 },
                { label: "Febrero", value: 430 },
                { label: "Marzo", value: 448 },
                { label: "Abril", value: 470 },
                { label: "Mayo", value: 540 },
                { label: "Junio", value: 580 },
                { label: "Julio", value: 690 },
                { label: "Agosto", value: 1100 },
                { label: "Septiembre", value: 1200 },
                { label: "Octubre", value: 1380 },
                { label: "Noviembre", value: 1430 },
                { label: "Diciembre", value: 1470 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Ordenes - Linea de Tiempo"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  "1983, ordenes, $4220",
                  "12 facturas fueron pagadas",
                  "Orden #37745 de Septiembre",
                  "Nuevo pedido realizado #XF-2356",
                  "Nuevo pedido realizado #XF-2346",
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
