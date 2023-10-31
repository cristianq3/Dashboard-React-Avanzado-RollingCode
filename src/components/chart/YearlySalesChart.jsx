import ReactApexChart from "react-apexcharts";
// @mui
import { Box, Card, CardHeader, Container } from "@mui/material";
// utils
import { fCurrency, fNumber } from "../../utils/formatNumber";
// components
import { useChart } from "../../components/chart";
import useSalesFilter from "../../hooks/useSalesFilter";

// ----------------------------------------------------------------------

export default function YearlySalesChart({ title, ...other }) {
  const {
    sales: yearlySales,
    isLoading: yearlySalesIsLoading,
    error: yearlySalesError,
  } = useSalesFilter(`/sales/filter/yearlySales`);

  const getSalesWithMonths = (sales) => {
    const months = [
      { monthName: "Enero", monthNumber: 1 },
      { monthName: "Febrero", monthNumber: 2 },
      { monthName: "Marzo", monthNumber: 3 },
      { monthName: "Abril", monthNumber: 4 },
      { monthName: "Mayo", monthNumber: 5 },
      { monthName: "Junio", monthNumber: 6 },
      { monthName: "Julio", monthNumber: 7 },
      { monthName: "Agosto", monthNumber: 8 },
      { monthName: "Septiembre", monthNumber: 9 },
      { monthName: "Octubre", monthNumber: 10 },
      { monthName: "Noviembre", monthNumber: 11 },
      { monthName: "Diciembre", monthNumber: 12 },
    ];

    const result = months.map((month) => {
      const ventaDelMes = sales?.find(
        (sale) => sale.saleMonth.monthNumber === month.monthNumber
      );
      if (ventaDelMes) {
        return ventaDelMes;
      } else {
        return {
          totalSalesPrice: 0,
          totalSalesQuantity: 0,
          saleMonth: month,
        };
      }
    });

    return result;
  };

  const salesWithMonth = getSalesWithMonths(yearlySales?.yearlySales);

  const yearlySalesWithDataFormat = salesWithMonth.map((sale) => ({
    label: sale.saleMonth.monthName,
    value: sale.totalSalesPrice,
  }));

  const chartData = yearlySalesIsLoading ? [] : yearlySalesWithDataFormat;

  const subheader =
    "Aquí puedes visualizar los ingresos del año para tu negocio.";

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fCurrency(seriesName),
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "28%", borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
      labels: {
        formatter: function (value) {
          // Format the value as currency
          return (
            "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
          );
        },
      },
    },
  });

  if (yearlySalesError) {
    return (
      <Container>
        <Typography variant="h3">
          Error al obtener datos. Intente nuevamente más tarde
        </Typography>
      </Container>
    );
  }

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }} dir="ltr">
        <ReactApexChart
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
