import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker/locale/es";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography, Modal, Box, Button } from "@mui/material";
// sections
import {
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates,
} from "../sections/@dashboard/app";
import { DataGrid, esES } from "@mui/x-data-grid";
import { SalesContext } from "../contexts/SalesContext";
import { useContext, useEffect, useState } from "react";
import { fDate } from "../utils/formatTime";
import Carousel from "../components/carousel/Carousel";

// ----------------------------------------------------------------------

export default function SalesPage() {
  const theme = useTheme();

  const { state, getSales } = useContext(SalesContext);

  useEffect(() => {
    getSales();
    console.log(state.sales);
  }, [state.isLoading]);

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
            <DataTable sales={state.sales} />
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

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 200,
  },
  {
    field: "fecha",
    headerName: "Fecha",
    width: 160,
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
    align: "left",
  },

  {
    field: "productos",
    headerName: "Productos",
    renderCell: (products) => <BasicModal products={products.value} />,
    sortable: false,
    width: 160,
  },
];

const BasicModal = ({ products }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Ver productos</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Carousel products={products} />
        </Box>
      </Modal>
    </div>
  );
};

function DataTable({ sales }) {
  const rowsWithFormat = sales.map((sale) => ({
    id: sale._id,
    comprador: `${sale.user.firstname} ${sale.user.lastname}`,
    productos: sale.cartProducts,
    valor: new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(sale.totalPrice),
    fecha: fDate(sale.saleDate, "dd MMMM yyyy"),
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Container>
        <DataGrid
          rows={rowsWithFormat}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          column
          pageSizeOptions={[5, 10]}
          rowSelection={false}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        />
      </Container>
    </div>
  );
}
