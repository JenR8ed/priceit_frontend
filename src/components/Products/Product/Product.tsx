import { useState, useEffect, useRef } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ProductDataProps, ProductData } from "../../../types/product";
import UserAuthService from "../../../services/UserAuthService";
import { useUser } from "../../../auth/useUser";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../../types";
import { Alert, Snackbar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function Product({
  title,
  hiddenTitle,
  productList,
  error,
  hiddenError,
}: ProductDataProps): JSX.Element {
  let localProducts: any = [];
  if (localStorage["favoriteProducts"]) {
    const oldFavorites: ProductData[] | undefined = JSON.parse(
      localStorage.getItem("favoriteProducts") || ""
    );
    localProducts = JSON.parse(JSON.stringify(oldFavorites));
  } else {
    localProducts = [];
  }
  const data = useUser();
  const [favoriteProducts, setFavoriteProducts] = useState<
    ProductData[] | undefined
  >([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [cookie] = useCookies(["logged_in"]),
  const token = localStorage.getItem("access_token");
  const pathName = window.location.pathname;
  function handleFavorites(
    e: React.SyntheticEvent,
    p: ProductData,
    index: number
  ) {
    if (cookie.logged_in === "true") {
      e.preventDefault();
      if (p) {
        setActiveIndex(index);
        if (!favoriteProducts?.includes(p))
          setFavoriteProducts(favoriteProducts?.concat(p));
        if (!favoriteProducts?.includes(p)) localProducts.push(p);
        if (!favoriteProducts?.includes(p)) AddUserItemsProfile(p);
        localStorage.setItem("favoriteProducts", JSON.stringify(localProducts));
      } else {
        setActiveIndex(-1);
      }
    }else {
      setErrorMessage("Login or Register");
      setOpenError(true)
    }
  }

  const AddUserItemsProfile = async (item: ProductData) => {
    try {
      await UserAuthService.AddUserItem(data.sub._id, item).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setSuccessMessage(response.data.message);
          setOpenSuccess(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteUserItemsProfile = async (itemId: string) => {
    try {
      await UserAuthService.DeleteUserItem(data.sub._id, itemId).then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            setSuccessMessage(response.data.message);
            setOpenSuccess(true);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const handleCloseSuccess = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  return (
    <>
      <div className="container_signup">
        <Stack spacing={2} sx={{ maxWidth: 200 }}>
          <Snackbar
            open={openError}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleClose}
            sx={{ width: "20%" }}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openSuccess}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleCloseSuccess}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {successMessage}
            </Alert>
          </Snackbar>
        </Stack>
      </div>
      <div className="product_container">
        <div className="product_header" hidden={hiddenTitle}>
          <h1>{title}</h1>
        </div>
        {error && (
          <div className="error" hidden={hiddenError}>
            <h1>{error}</h1>
          </div>
        )}
        {productList?.map((p, idx) => (
          <Card sx={{ maxWidth: 245 }} key={idx}>
            <a href={p.itemRef} target="_blank" rel="noreferrer">
              <CardMedia
                className="zoom"
                component="img"
                height="150"
                image={p.image.uri}
                alt="Paella dish"
              />
            </a>
            <CardContent sx={{ maxHeight: 30 }}>
              <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                {p.title}
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                {p.price.currency + p.price.value}
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ bottom: 0 }}>
              <Box sx={{ width: 500, bottom: 0, paddingTop: 5 }}>
                {pathName === "/" ? (
                  <Tooltip title="Add to favorites">
                    <IconButton
                      id={idx.toString()}
                      aria-label="add to favorites"
                      color={idx === activeIndex ? "info" : "default"}
                      onClick={(e) => handleFavorites(e, p, idx)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Delete from Favorites">
                    <IconButton
                      id={idx.toString()}
                      aria-label="delete from favorites"
                      color={idx === activeIndex ? "info" : "default"}
                      onClick={(e) => DeleteUserItemsProfile(p.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </CardActions>
          </Card>
        ))}
      </div>
    </>
  );
}
