import Carousel from "react-material-ui-carousel";
import { Paper, Container } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const SalesCarousel = ({ products }) => {
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
          height="440"
          image={product._id.image.secure_url}
          style={{ padding: 4, background: "#000" }}
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
