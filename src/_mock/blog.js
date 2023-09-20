import { faker } from "@faker-js/faker/locale/es";

// ----------------------------------------------------------------------

const POST_TITLES = [
  "Plantillas de Pizarra Blanca de Líderes en la Industria",
  "Remolque Inspirado en el Tesla Cybertruck para los Amantes de Tesla que No Pueden Esperar al Camión",
  "Diseño de la Página de Aterrizaje para la Agencia Designify",
  "Lo Hecho, Hecho Está: Reflexiones sobre la Vida",
  "El Príncipe Fresco",
  "Estudio Seis Calcetines: Detrás de las Creaciones",
  "La Contaminación: Un Estudio por Vincenzo de Cotiis en su Último Proyecto",
  "Animaciones Atractivas y Sencillas para Mejorar tu Proyecto | Tutorial en Video",
  "40 Fuentes Serif Gratuitas Ideales para Diseñadores Digitales",
  "El Cambio en la Demanda de Diseño Web a lo Largo del Tiempo",
  "Katie Griffin: Creando Arte con un Toque Casero",
  "El Sueño Americano Reinterpretado a Través de Gráficos Ferroviarios de la Época Dorada",
  "Diseño de Sistemas de Ilustración: Explorando la Creatividad Visual",
  "CarZio: Tu Aliado en la Entrega Rápida - Inicio de Sesión/Registro",
  "Cómo Crear una Aplicación Jamstack sin Servidor con Netlify, Gatsby y Fauna",
  "Tylko: Organización Simplificada en 3D y Diseño de Movimiento",
  "RAYO: Descubre la Identidad de un Festival de Artes Visuales Ampliado",
  'Entrevista Exclusiva: Anthony Burrill y Andrew Diprose de Wired Magazine Hablan sobre la Creación de la Portada "Cambia Todo" de Enero',
  "Sumergiéndose en la Mente Creativa de Samuel Day",
  "Revisión de Portafolio: ¿Demasiada Creatividad o la Justa para Sobresalir?",
  "Akkers van Margraten: Historias de la Tierra y la Agricultura",
  "Icono de Boleta de Entrada con Efecto de Degradado: Últimas Tendencias en Diseño",
  "El Concepto de Motocicleta Dyson que Está Generando Expectativas Positivas",
  "Cómo Dar Vida a tus SVG con border-image: Consejos y Trucos",
];

const posts = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: POST_TITLES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
