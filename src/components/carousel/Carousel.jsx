import Carousel from "react-material-ui-carousel";
import { Paper, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const SalesCarousel = ({ products }) => {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <Carousel>
      {products?.map((product) => (
        <Item key={product._id} product={product} />
      ))}
    </Carousel>
  );
};

function Item({ product }) {
  return (
    <Container
      sx={{
        padding: 4,
        alignItems: "center",
      }}
    >
      <Card sx={{}}>
        <CardMedia
          component="img"
          alt={product.productName}
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.productName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Precio: ${product.price} - Cantidad: {product.quantity}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default SalesCarousel;
