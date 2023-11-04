import { Helmet } from "react-helmet-async";
import { faker } from "@faker-js/faker/locale/es";
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
import Iconify from "../components/iconify";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux/es";
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from "../sections/@dashboard/app";
import SalesChart from "../sections/@dashboard/app/SalesChart";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [clientesConectados, setClientesConectados] = useState(0);

  const { clientConnect } = useSelector( (state) => state.notificationsData)

  useEffect( () => {
    setClientesConectados(clientConnect);
  }, [clientConnect])

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          ¡Bienvenido!
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Ventas Semanales"
              total={714000}
              icon={"ant-design:android-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Nuevos Usuarios"
              //total={1352831} 
              total={clientesConectados}
              color="info"
              icon={"ant-design:apple-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Ordenes de Articulos"
              total={1723315}
              color="warning"
              icon={"ant-design:windows-filled"}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Informes de Errores"
              total={234}
              color="error"
              icon={"ant-design:bug-filled"}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <SalesChart />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Visitas actuales"
              chartData={[
                { label: "America", value: 4344 },
                { label: "Asia", value: 5435 },
                { label: "Europa", value: 1443 },
                { label: "Africa", value: 4443 },
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
              title="Medidas de Conversión"
              subheader="(+43%) más que el último año."
              chartData={[
                { label: "Italia", value: 400 },
                { label: "Japon", value: 430 },
                { label: "China", value: 448 },
                { label: "Canada", value: 470 },
                { label: "Francia", value: 540 },
                { label: "Alemania", value: 580 },
                { label: "Corea del Sur", value: 690 },
                { label: "Holanda", value: 1100 },
                { label: "Estados Unidos", value: 1200 },
                { label: "Reino Unido", value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Tema Actual"
              chartLabels={[
                "Inglés",
                "Historia",
                "Fisica",
                "Geografía",
                "Chino",
                "Matemáticas",
              ]}
              chartData={[
                { name: "Serie 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Serie 2", data: [20, 30, 40, 80, 20, 80] },
                { name: "Serie 3", data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(
                () => theme.palette.text.secondary
              )}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="Noticias"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/assets/images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
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

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Trafico de Visitas por Sitio"
              list={[
                {
                  name: "Facebook",
                  value: 323234,
                  icon: (
                    <Iconify
                      icon={"eva:facebook-fill"}
                      color="#1877F2"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Google",
                  value: 341212,
                  icon: (
                    <Iconify
                      icon={"eva:google-fill"}
                      color="#DF3E30"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Linkedin",
                  value: 411213,
                  icon: (
                    <Iconify
                      icon={"eva:linkedin-fill"}
                      color="#006097"
                      width={32}
                    />
                  ),
                },
                {
                  name: "Twitter",
                  value: 443232,
                  icon: (
                    <Iconify
                      icon={"eva:twitter-fill"}
                      color="#1C9CEA"
                      width={32}
                    />
                  ),
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tareas"
              list={[
                { id: "1", label: "Crear Logo" },
                {
                  id: "2",
                  label: "Agregar archivos SCSS y JS si es requerido",
                },
                { id: "3", label: "Reunion con cliente" },
                { id: "4", label: "Alcances y estimaciones" },
                { id: "5", label: "Presentación del proyecto" },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
