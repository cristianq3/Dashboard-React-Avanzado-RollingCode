import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker/locale/es";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// sections
import {
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates,
} from "../sections/@dashboard/app";
import { DataGrid, esES } from "@mui/x-data-grid";

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "productos",
    headerName: "Productos",
    width: 200,
  },
  {
    field: "comprador",
    headerName: "Comprador",
    width: 160,
  },
  {
    field: "valor",
    headerName: "Valor",
    type: "number",
    width: 130,
    sortable: false,
    headerAlign: "left",
  },
  {
    field: "fecha",
    headerName: "Fecha",
    width: 160,
  },
];

const rows = [
  {
    id: 1,
    comprador: "Snow",
    productos: "Jon",
    valor: 35,
    fecha: "12/10/2023",
  },
  {
    id: 2,
    comprador: "Lannister",
    productos: "Cersei",
    valor: 42,
    fecha: "12/10/2023",
  },
  {
    id: 3,
    comprador: "Lannister",
    productos: "Jaime",
    valor: 45,
    fecha: "12/10/2023",
  },
  {
    id: 4,
    comprador: "Stark",
    productos: "Arya",
    valor: 16,
    fecha: "12/10/2023",
  },
  {
    id: 5,
    comprador: "Targaryen",
    productos: "Daenerys",
    valor: 100,
    fecha: "12/10/2023",
  },
  {
    id: 6,
    comprador: "Melisandre",
    productos: null,
    valor: 150,
    fecha: "12/10/2023",
  },
  {
    id: 7,
    comprador: "Clifford",
    productos: "Ferrara",
    valor: 44,
    fecha: "12/10/2023",
  },
  {
    id: 8,
    comprador: "Frances",
    productos: "Rossini",
    valor: 36,
    fecha: "12/10/2023",
  },
  {
    id: 9,
    comprador: "Roxie",
    productos: "Harvey",
    valor: 65,
    fecha: "12/10/2023",
  },
];

const rowsWithPrice = rows.map((row) => ({
  ...row,
  valor: new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(row.valor),
}));

function DataTable() {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <Container>
        <DataGrid
          rows={rowsWithPrice}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Container>
    </div>
  );
}

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
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
            <DataTable />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Ventas por día"
              subheader="Usa esta herramienta para medir el desempeño diario de tu tienda."
              chartLabels={[
                "Ene '23",
                "Feb '23",
                "Mar '23",
                "Abr '23",
                "May '23",
                "Jun '23",
                "Jul '23",
                "Ago '23",
                "Sep '23",
                "Oct '23",
              ]}
              chartData={[
                {
                  name: "Equipo A",
                  type: "column",
                  fill: "solid",
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22],
                },
                {
                  name: "Equipo B",
                  type: "area",
                  fill: "gradient",
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27],
                },
                {
                  name: "Equipo C",
                  type: "line",
                  fill: "solid",
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36],
                },
              ]}
            />
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
