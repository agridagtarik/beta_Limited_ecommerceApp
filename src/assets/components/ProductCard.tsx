import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { Box, IconButton, Rating } from "@mui/material";
import AddBox from "@mui/icons-material/AddOutlined";
import RemoveBox from "@mui/icons-material/RemoveOutlined";
import { useDispatch } from "react-redux";
import {
  addProductToCartRequest,
  removeProductFromCartRequest,
} from "src/store/api/sagas";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: string;
    rating: number;
    discount: string;
  };
  cart: {
    productId: string;
    quantity: number;
    name: string;
    price: number;
  }[];
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, cart }) => {
  const dispatch = useDispatch();

  const getQty = (id: string) => {
    if (typeof cart === "string") return 0;
    const item = cart?.find((item: any) => item.productId === id);
    return item ? item.quantity : 0;
  };

  const addProductToCart = (id: string) =>
    dispatch(addProductToCartRequest(id));

  const removeProductFromCart = (id: string) =>
    dispatch(removeProductFromCartRequest(id));

  return (
    <Card style={{ width: 350 }}>
      <Badge
        badgeContent={product.discount}
        color="error"
        overlap="circular"
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ bottom: 30 }}
      >
        <CardMedia
          sx={{
            height: "60%",
            objectFit: "cover",
            borderBottom: 1,
            borderColor: "gray",
          }}
          image={product.image}
          title={product.name}
          component={"img"}
          onError={(e) =>
            (e.currentTarget.src = `https://commercial.bunn.com/img/image-not-available.png`)
          }
        />
      </Badge>
      <CardContent
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box component="div" sx={{ marginTop: 3, height: 130 }}>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Rating name="read-only" value={Number(product.rating)} readOnly />
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="error"
              sx={{ marginRight: "10px" }}
            >
              ${product.price}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ${product.originalPrice}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: 130,
          }}
        >
          <Box>
            {getQty(product.id) > 0 ? (
              <IconButton
                onClick={() => removeProductFromCart(product.id)}
                sx={{ width: 40, height: 40 }}
              >
                <RemoveBox
                  fontSize="large"
                  color="error"
                  sx={{ border: 1, borderRadius: 1 }}
                />
              </IconButton>
            ) : (
              <Box sx={{ width: 40, height: 40 }}></Box>
            )}
          </Box>
          <Box>
            {getQty(product.id) > 0 ? (
              <Typography
                color="black"
                sx={{
                  width: 40,
                  height: 40,
                  fontSize: 22,
                  textAlign: "center",
                }}
              >
                {getQty(product.id)}
              </Typography>
            ) : (
              <Box sx={{ width: 40, height: 40 }}></Box>
            )}
          </Box>
          <Box>
            <IconButton
              onClick={() => addProductToCart(product.id)}
              sx={{ width: 40, height: 40 }}
            >
              <AddBox
                fontSize="large"
                color="error"
                sx={{ border: 1, borderRadius: 1 }}
              />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
export default ProductCard;
