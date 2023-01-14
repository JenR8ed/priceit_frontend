import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material/";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { ProductData, ProductDataProps, User } from "../../types";
import { Container } from "@mui/material/";
import Product from "../Products/Product";
import { useEffect, useState } from "react";
import UserAuthService from "../../services/UserAuthService";
import { useUser } from "../../auth/useUser";
export function Profile() {
  const data = useUser();

  const [favoriteProducts, setFavoriteProducts] = useState<
    ProductData[] | undefined
  >([]);
  const [searches, setSearches] = useState<string[] | undefined>([]);
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  // function getFavoritesItems() {
  //   if (localStorage["favoriteProducts"]) {
  //     let favProducts: ProductData[] | undefined = JSON.parse(
  //       localStorage.getItem("favoriteProducts") || ""
  //     );
  //     setFavoriteProducts(favProducts);
  //   }
  // }
  useEffect(() => {
    GetUserItemsProfile();
  }, []);

  const GetUserItemsProfile = async () => {
    try {
      await UserAuthService.GetUserItems(data.sub._id).then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          setFavoriteProducts(response.data.data.user.items);
          setSearches(response.data.data.user.searches);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const DeleteUserSearchProfile = async (searchWord:string) => {
    try {
      await UserAuthService.DeleteUserSearches(data.sub._id, searchWord).then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log(response);
          setSuccessMessage(response.data.message);
          setOpenSuccess(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };


  const handleDelete = (s:string) => {
   
    DeleteUserSearchProfile(s)
    console.info("You clicked the delete icon.", s);
    window.location.reload();
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
    <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <Snackbar
          open={openError}
          autoHideDuration={5000}
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
      <h4>Your recent searches :</h4>
      <div className="chips_container">
        {searches?.map((s, idx) => (
          <Stack direction="row" spacing={1} key={idx} sx={{display:"inline-flex"}}>
            <Chip
              label={s}
              variant="outlined"
              color="info"
              onClick={handleClick}
              onDelete={(e) => handleDelete(s)}
              sx={{margin:1}}
            />
          </Stack>
        ))}
      </div>
      <h4>Your favorites products :</h4>
      <Product title="Your Favorites Products" productList={favoriteProducts}></Product>
    </>
  );
}
