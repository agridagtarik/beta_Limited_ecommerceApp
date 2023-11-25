import React from "react";
import ProductCard from "src/assets/components/ProductCard";
import { Box, CardMedia, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchViewCartRequest } from "src/store/api/sagas";
import { createSessionRequest } from "src/store/api/authsagas";
import { getCurrentSettings } from "src/shared/helpers";

export const HomePage: React.FC = () => {
  const { data, cart } = useSelector((state: any) => state.products);

  const dispatch = useDispatch();

  const sessionId = getCurrentSettings();

  React.useEffect(() => {
    if (!sessionId) {
      dispatch(createSessionRequest());
      dispatch(fetchViewCartRequest());
    } else if (sessionId) {
      dispatch(fetchViewCartRequest());
    }
  }, []);

  return !data?.length ? (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center",
        width: "100%",
        height: "80vh",
      }}
    >
      <CardMedia
        image={`https://trolleymate.co.uk/assets/img/error_404.jpeg`}
        title={"ProductNotFOund"}
        component={"img"}
        sx={{ height: 500, width: 500 }}
      />
    </Box>
  ) : (
    <Grid
      color="primary"
      container
      spacing={2}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {data?.map((product: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} cart={cart} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
