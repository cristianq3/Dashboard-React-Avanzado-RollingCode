// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "Panel de Administración",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "Usuarios",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
  {
    title: "Productos",
    path: "/dashboard/products",
    icon: icon("ic_cart"),
  },
  {
    title: "Ventas",
    path: "/dashboard/sales",
    icon: icon("ic_dollar"),
  },
  {
    title: "blog",
    path: "/dashboard/blog",
    icon: icon("ic_blog"),
  },
  {
    title: "login",
    path: "/login",
    icon: icon("ic_lock"),
  },
  {
    title: "Not found",
    path: "/404",
    icon: icon("ic_disabled"),
  },
];

export default navConfig;
