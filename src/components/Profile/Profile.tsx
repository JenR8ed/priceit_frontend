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
import { useNavigate } from "react-router-dom";
export function Profile() {
  const data = useUser();
  const navigate = useNavigate();
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
  const DeleteUserSearchProfile = async (searchWord: string) => {
    try {
      await UserAuthService.DeleteUserSearches(data.sub._id, searchWord).then(
        (response) => {
          console.log(response);
          if (response.status === 200) {
            console.log(response);
            setSuccessMessage(response.data.message);
            setOpenSuccess(true);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  function gotoHome() {
    navigate("/");
  }
  const handleClick = (s: string) => {
    sessionStorage.setItem("searchFromProfile", s);
    gotoHome();
  };

  const handleDelete = (e: React.SyntheticEvent, search: string) => {
    e.preventDefault();
    DeleteUserSearchProfile(search);
    // var array:string[] | undefined = [...searches]; // make a separate copy of the array
  // var index = array.indexOf(e.target.value)
  // if (index !== -1) {
  //   array.splice(index, 1);
  //   this.setState({people: array});
  // }
    setSuccessMessage("Search deleted!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);

  };
  useEffect(()=>{

  },[searches])
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
          autoHideDuration={1000}
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
          autoHideDuration={1000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseSuccess}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            {successMessage}
          </Alert>
        </Snackbar>
      </Stack>
<div className="search">

      <Card elevation={8} sx={{ maxWidth:350, padding: 1 , position: "fixed",
                  top: 100,
                  zIndex: 1100,
                  left: 50,}}>
        <CardContent
          sx={{ maxHeight: 245, display: "block", marginBlock: 10, padding: 2 }}
        >
          <Typography color="#64b5f6" sx={{ fontSize: 30, display: "block" }}>
            {data.sub.firstName} {data.sub.lastName}
          </Typography>
          <Typography color="#64b5f6" sx={{ fontSize: 20 }}>
            {data.sub.email}
          </Typography>
        </CardContent>
      </Card>

      </div>

      {/* <div className="chips_container"> */}
      {/* <Card elevation={2} sx={{maxWidth:500, padding: 1, marginTop:20, marginBottom:10, marginLeft:"auto", marginRight:"auto"}}> */}
      <Typography color="#64b5f6" sx={{ fontSize: 30, display: "block", position:"relative", top:50 }}>
        Recent searches:
      </Typography>
      {searches?.map((s, idx) => (
          <Stack
          
            direction="row"
            spacing={1}
            key={idx}
            sx={{ display: "inline-flex" , position:"relative", top:80, marginBottom:10, marginTop:2}}
          >
            <Chip
              label={s}
              variant="outlined"
              color="info"
              onClick={(e) => handleClick(s)}
              onDelete={(e) => handleDelete(e, s)}
              sx={{ margin: 1 }}
            />
          </Stack>
        ))}
      {/* </Card> */}
        
      {/* </div> */}
      <Box sx={{ flexGrow: 1 }} >
      {/* <Typography color="#64b5f6" sx={{ fontSize: 30, display:"inline-flex" }}>
        Favorites :
      </Typography> */}
      <Product
        title="Favorite Products"
        // hiddenTitle={true}
        productList={favoriteProducts}
      ></Product>
      </Box>
     
    </>
  );
}
