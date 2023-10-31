import ReactApexChart from "react-apexcharts";
// @mui
import {
  Card,
  CardHeader,
  Box,
  Container,
  Typography,
  CardActions,
  Button,
  Modal,
  CardContent,
} from "@mui/material";
// components
import { useChart } from "../../../components/chart";
import useSalesFilter from "../../../hooks/useSalesFilter";
import { fCurrency } from "../../../utils/formatNumber";
import { useState } from "react";
import { fDate, fWeek } from "../../../utils/formatTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DateRangeIcon from "@mui/icons-material/DateRange";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

// ----------------------------------------------------------------------

export default function SalesChart() {
  const {
    sales: dailySales,
    isLoading: isLoadingDailySales,
    error: dailySalesError,
  } = useSalesFilter(`/sales/filter/dailySales`);

  const {
    sales: monthlySales,
    isLoading: isLoadingMonthlySales,
    error: monthlySalesError,
  } = useSalesFilter("/sales/filter/monthlySales");

  const dailySalesWithDataFormat = () => {
    return [
      {
        x: dailySales?.currentDate,
        y: dailySales?.totalDailySalesQuantity || 0,
      },
    ];
  };

  const monthlySalesWithDataFormat = () => {
    return monthlySales?.monthlySales.map((sale) => ({
      x: sale.saleDate,
      y: sale.totalSalesQuantity,
    }));
  };

  const { formattedFirstDay, formattedLastDay } = fWeek();

  const startOfWeek = new Date(formattedFirstDay);
  const endOfWeek = new Date(`${formattedLastDay}T23:59:59`);

  const salesInLastWeek = monthlySales?.monthlySales.filter((sale) => {
    const saleDate = new Date(sale.saleDate);
    return saleDate >= startOfWeek && saleDate <= endOfWeek;
  });

  const totalSalesQuantityLastWeek = salesInLastWeek?.reduce(
    (total, sale) => total + sale.totalSalesQuantity,
    0
  );
  const totalSalesPriceLastWeek = salesInLastWeek?.reduce(
    (total, sale) => total + sale.totalSalesPrice,
    0
  );

  const weeklySalesWithDataFormat = () => {
    return salesInLastWeek?.map((sale) => ({
      x: sale.saleDate,
      y: sale.totalSalesQuantity,
    }));
  };

  const title = "Ventas Realizadas";

  const subheader =
    "Usa esta herramienta para medir el desempeño de tu tienda.";

  const chartData = [
    {
      name: "Hoy",
      type: "column",
      fill: "solid",
      data: isLoadingDailySales ? [] : dailySalesWithDataFormat(),
    },
    {
      name: "Semana",
      type: "area",
      fill: "gradient",
      data: isLoadingMonthlySales ? [] : weeklySalesWithDataFormat(),
    },
    {
      name: "Mes",
      type: "line",
      color: "#ff0000",
      fill: "solid",
      data: isLoadingMonthlySales ? [] : monthlySalesWithDataFormat(),
    },
  ];

  const chartOptions = useChart({
    plotOptions: { bar: { columnWidth: "4%" } },
    fill: { type: chartData.map((i) => i.fill) },
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            return `${y.toFixed(0)} ventas`;
          }
          return y;
        },
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      showForZeroSeries: true,
    },
  });

  if (dailySalesError || monthlySalesError) {
    return (
      <Container>
        <Typography variant="h3">
          Error al obtener datos. Intente nuevamente más tarde
        </Typography>
      </Container>
    );
  }

  return (
    <Card>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={364}
        />
      </Box>
      <CardActions sx={{ pb: 3, display: "flex", justifyContent: "center" }}>
        <DailyModal dailySales={dailySales} />
        <WeeklyModal
          totalSalesQuantityLastWeek={totalSalesQuantityLastWeek}
          totalSalesPriceLastWeek={totalSalesPriceLastWeek}
          startOfWeek={formattedFirstDay}
          endOfWeek={formattedLastDay}
        />
        <MonthlyModal monthlySales={monthlySales} />
      </CardActions>
    </Card>
  );
}

const DailyModal = ({ dailySales }) => {
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
      <Button onClick={handleOpen} size="small" variant="contained">
        Resumen diario
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              style={{
                backgroundColor: "blue",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "4",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <DateRangeIcon style={{ fontSize: 50, marginRight: 8 }} />
                <Typography variant="h5">
                  Fecha de hoy: {fDate(dailySales?.currentDate, "dd MMMM yyyy")}
                </Typography>
              </div>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <AttachMoneyIcon style={{ fontSize: 50, marginRight: 8 }} />
                <Typography variant="h5">
                  Ingresos Totales:
                  <span style={{ marginLeft: 5 }}>
                    {fCurrency(dailySales?.totalDailySalesPrice) || 0}
                  </span>
                </Typography>
              </div>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <ShoppingBasketIcon style={{ fontSize: 50, marginRight: 8 }} />
                <Typography variant="h5">
                  Cantidad de Ventas:
                  {dailySales?.totalDailySalesQuantity}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

const WeeklyModal = ({
  totalSalesQuantityLastWeek,
  totalSalesPriceLastWeek,
  startOfWeek,
  endOfWeek,
}) => {
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
      <Button
        onClick={handleOpen}
        size="small"
        variant="contained"
        color="warning"
      >
        Resumen semanal
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              style={{
                backgroundColor: "orange",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "4",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <DateRangeIcon style={{ fontSize: 50, marginRight: 8 }} />
                <Typography variant="h5">
                  Desde: {startOfWeek} - Hasta:
                  {endOfWeek}
                </Typography>
              </div>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <AttachMoneyIcon style={{ fontSize: 50, marginRight: 8 }} />
                <Typography variant="h5">
                  Ingresos Totales:
                  <span style={{ marginLeft: 5 }}>
                    {fCurrency(totalSalesPriceLastWeek) || 0}
                  </span>
                </Typography>
              </div>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <ShoppingBasketIcon style={{ fontSize: 50, marginRight: 8 }} />
                <Typography variant="h5">
                  Cantidad de Ventas:
                  {totalSalesQuantityLastWeek}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

const MonthlyModal = ({ monthlySales }) => {
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
      <Button
        onClick={handleOpen}
        size="small"
        variant="contained"
        color="error"
      >
        Resumen mensual
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent
              style={{
                backgroundColor: "red",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "4",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <DateRangeIcon style={{ fontSize: 50, marginRight: 8 }} />
                <Typography variant="h5">
                  Desde: {monthlySales?.monthStartDate} - Hasta:
                  {monthlySales?.monthEndDate}
                </Typography>
              </div>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <AttachMoneyIcon style={{ fontSize: 50, marginRight: 8 }} />
                <Typography variant="h5">
                  Ingresos Totales:
                  <span style={{ marginLeft: 5 }}>
                    {fCurrency(monthlySales?.totalMonthlySalesPrice) || 0}
                  </span>
                </Typography>
              </div>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <ShoppingBasketIcon style={{ fontSize: 50, marginRight: 8 }} />
                <Typography variant="h5">
                  Cantidad de Ventas:
                  {monthlySales?.totalMonthlySalesQuantity}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};
