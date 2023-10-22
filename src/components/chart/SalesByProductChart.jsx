import ReactApexChart from "react-apexcharts";
// @mui
import { useTheme, styled } from "@mui/material/styles";
import { Card, CardHeader, Container } from "@mui/material";
// utils
import { fNumber } from "../../utils/formatNumber";
// components
import { useChart } from "../../components/chart";
import useSalesFilter from "../../hooks/useSalesFilter";

// ----------------------------------------------------------------------

const CHART_HEIGHT = 380;
const LEGEND_HEIGHT = 72;

const StyledChartWrapper = styled("div")(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  "& .apexcharts-canvas svg": { height: CHART_HEIGHT },
  "& .apexcharts-canvas svg,.apexcharts-canvas foreignObject": {
    overflow: "visible",
  },
  "& .apexcharts-legend": {
    height: LEGEND_HEIGHT,
    alignContent: "center",
    position: "relative !important",
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

export default function SalesByProductChart({
  title,
  subheader,
  chartColors,
  ...other
}) {
  const theme = useTheme();

  const {
    sales: salesByProduct,
    isLoading: salesByProductIsLoading,
    error: salesByProductError,
  } = useSalesFilter(`/sales/filter/byProduct`);

  const salesByProductWithDataFormat = salesByProduct?.map((sale) => ({
    label: sale.productName,
    value: sale.totalQuantity,
  }));

  const chartData = salesByProductIsLoading ? [] : salesByProductWithDataFormat;

  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    colors: chartColors,
    labels: chartLabels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: "center" },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } },
    },
  });

  if (salesByProductError) {
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

      <StyledChartWrapper dir="ltr">
        <ReactApexChart
          type="pie"
          series={chartSeries}
          options={chartOptions}
          height={280}
        />
      </StyledChartWrapper>
    </Card>
  );
}
