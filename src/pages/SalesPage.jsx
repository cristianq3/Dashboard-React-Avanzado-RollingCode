import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker/locale/es";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography, Card, CardHeader } from "@mui/material";
// sections
import {
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates,
} from "../sections/@dashboard/app";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];

function SalesTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="sales table">
        <TableHead>
          <TableRow>
            <TableCell>Productos</TableCell>
            <TableCell align="right">Comprador</TableCell>
            <TableCell align="right">Valor Total</TableCell>
            <TableCell align="right">Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
            <Card>
              <CardHeader title="Ultimas ventas" sx={{ pb: 1 }} />
              <SalesTable />
            </Card>
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
