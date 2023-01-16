import { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import ProductDataService from "../../services/ProductDataService";
import Product from "../Products/Product";
import { ProductData } from "../../types/product";
import {
  Button,
  TextField,
  Pagination,
  Stack,
  Snackbar,
  Alert,
  BottomNavigation,
  Paper,
  BottomNavigationAction,
  SvgIcon,
} from "@mui/material/";
import { useFormik } from "formik";
import { searchWordValidationSchema } from "../../validationSchema";
import { ProductDataProps } from "../../types/product";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import UserAuthService from "../../services/UserAuthService";
import { useUser } from "../../auth/useUser";
import { useCookies } from "react-cookie";
import { useSessionStorage } from "usehooks-ts";


const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 10,
  marginRight: 10,

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(40),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "left",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "50ch",
      },
    },
  },
}));
export function ProductsWrapper(): JSX.Element {
  //variables
  const limit: number = 20;
  let offset: number = 0;

  //hooks
  const [currentOffset, setCurrentOffset] = useSessionStorage(
    "current-offset",
    0
  );
  const [actualPage, setActualPage] = useSessionStorage("actual-page", 1);
  const data = useUser();
  const [cookie] = useCookies(["logged_in"]);

  //pagination
  const [hiddenPagination, setHiddenPagination] = useState(true);
  const [searchWordPagination, setSearchhWordPagination] = useState<string>("");
  // const [ lastSearch, setLastSearch] = useLocalStorage("lastSearch", searchWordPagination);
  const [searchValue, setSearchValue] = useSessionStorage("last-search", "");

  //titles
  const [hiddenFacebookTitle, setHiddenFacebookTitle] = useState<boolean>(true);
  const [hiddenEbayTitle, setHiddenEbayTitle] = useState<boolean>(true);
  const [hiddenGoogleTitle, setHiddenGoogleTitle] = useState<boolean>(true);

  //page
  const [currentPage, setCurrentPage] = useState<number>(1);
  //error
  const [hiddenError, setHiddenError] = useState<boolean>(true);
  const [ebayError, setEbayError] = useState<string>("");
  const [facebookError, setFacebookError] = useState<string>("");
  const [googleError, setGoogleError] = useState<string>("");

  //data
  const [ebayProducts, setEbayProducts] = useState<ProductData[] | undefined>();
  const [facebookProducts, setFacebookProducts] = useState<
    ProductData[] | undefined
  >();
  const [googleProducts, setGoogleProducts] = useState<
    ProductData[] | undefined
  >();

  const getFaceBookData = async (searchWord: string, offset: number) => {
    try {
      const responseFacebook =
        await ProductDataService.findFacebookProductsBySearchWord(
          searchWord,
          offset
        );
      console.log("facebook", responseFacebook);
      if (responseFacebook.status === 200) {
        setHiddenPagination(false);
        setFacebookProducts(responseFacebook.data.facebookData.itemList);
        setHiddenFacebookTitle(false);
        setHiddenError(true);
      }
    } catch (error: any) {
      // console.log(error.response.data);
      setHiddenFacebookTitle(false);
      setFacebookProducts([]);
      setFacebookError(error.response.data.error);
    }
  };

  //get Data functions
  const getEbayData = async (
    searchWord: string,
    limit: number,
    offset: number
  ) => {
    try {
      const responseEbay =
        await ProductDataService.findEbayProductsBySearchWord(
          searchWord,
          limit,
          offset
        );
      if (responseEbay.status === 200) {
        console.log(responseEbay);
        setEbayProducts(responseEbay.data.ebayData.itemList);
        
        setHiddenEbayTitle(false);
        setHiddenError(true);
      }
    } catch (error: any) {
      console.log(error.response.data);
      setEbayError(error.response.data.error);
      setHiddenError(false);
      setHiddenEbayTitle(false);
      setEbayProducts([]);
      setHiddenPagination(true);
    }
  };
  const getGoogleData = async (searchWord: string, offset: number) => {
    try {
      const responseGoogle =
        await ProductDataService.findGoogleProductsBySearchWord(
          searchWord,
          offset
        );
      if (responseGoogle.status === 200) {
        setGoogleProducts(responseGoogle.data.googleData.itemList);
        setHiddenPagination(false);
        setHiddenGoogleTitle(false);
        setHiddenError(true);
      }
    } catch (error: any) {
      console.log(error.response.data);
      setGoogleError(error.response.data.error);
      setHiddenError(false);
      setHiddenGoogleTitle(false);
      setGoogleProducts([]);
      setHiddenPagination(true);
    }
  };

  //form submission
  const formik = useFormik({
    initialValues: {
      searchWord: "",
    },
    validationSchema: searchWordValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      let searchWord: string = values.searchWord;
      searchWord = searchWord.replace(/([^a-z0-9]+)/gi, '');
      setSearchValue(searchWord);
      setSearchhWordPagination(searchWord);
      setCurrentPage(1);
      setActualPage(1);

      if (cookie.logged_in === "true" && searchWord !== null) {
        sessionStorage.setItem("search", searchWord);
        try {
          await UserAuthService.AddUserSearches(data.sub._id, searchWord).then(
            (response) => {
              if (response.status === 200) {
                console.log(response);
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      }

      getFaceBookData(searchWord, offset);
      getEbayData(searchWord, limit, offset);
      getGoogleData(searchWord, offset);

      // resetForm({
      //   values: {
      //     searchWord: "",
      //   },
      // });
    },
  });

  //Reload data on page refresh
  useEffect(() => {
    console.log("searchValue", searchValue);
    console.log("actualPage", actualPage);
    console.log("currentPage", currentPage);
    console.log(currentOffset);
    if (searchValue === "") {
      return;
    } else {
      console.log("useEffect function executing");
      console.log("useffet ", searchValue);
      setCurrentPage(actualPage);
      if (currentPage === 1 && actualPage === 1) {
        getFaceBookData(searchValue, currentOffset);
        getEbayData(searchValue, limit, currentOffset);
        getGoogleData(searchValue, currentOffset)
      } else {
        setHiddenFacebookTitle(true);
        getEbayData(searchValue, limit, currentOffset);
        getGoogleData(searchValue, currentOffset)
      }
    }
  }, []);

  //handle keys form
  const handleKeyDown = (
    event: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //@ts-ignore
    if (event.key === "Enter")
      //@ts-ignore
      formik.handleChange;
  };

  //handle Pagination
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log("handle function executing");
    setActualPage(page);
    setCurrentPage(page);

    let offset: number = (page - 1) * limit;
    setCurrentOffset(offset);
    console.log("handle search pagina ", searchWordPagination);
    try {
      ProductDataService.findEbayProductsBySearchWord(
        searchValue,
        limit,
        offset
      ).then((response) => {
        if (page === 1) {
          setHiddenFacebookTitle(false);
          getFaceBookData(searchValue, currentOffset);
        } else {
          setHiddenFacebookTitle(true);
        }

        setEbayProducts(response.data.ebayData.itemList);
        
      });
    } catch (error) {
      console.log(error);
    }
    try {
      ProductDataService.findGoogleProductsBySearchWord(
        searchValue,
        offset
      ).then((response) => {
        setGoogleProducts(response.data.googleData.itemList);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      {/* <div className="container_signup">
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
      </div> */}
      <div className="container">
        <Box sx={{ flexGrow: 1 }} className="navbar">
          <AppBar>
            <div className="search">
              <Toolbar
                sx={{
                  border: "1px solid",
                  borderRadius: "5px",
                  backgroundColor: "#199dff",
                  position: "fixed",
                  top: 100,
                  zIndex: 1100,
                  left: 50,
                }}
              >
                <h2>Price it!</h2>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <form onSubmit={formik.handleSubmit}>
                    <StyledInputBase
                      id="searchWord"
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      onChange={formik.handleChange}
                      //@ts-ignore
                      onKeyDown={handleKeyDown}
                      value={formik.values.searchWord}
                      error={
                        formik.touched.searchWord &&
                        Boolean(formik.errors.searchWord)
                      }
                    />
                  </form>
                </Search>
              </Toolbar>
            </div>
          </AppBar>
        </Box>
        <div hidden={hiddenFacebookTitle}>
          <Product
            title="Facebook Products"
            hiddenTitle={hiddenFacebookTitle}
            productList={facebookProducts}
            error={facebookError}
            hiddenError={hiddenError}
          ></Product>
        </div>

        <Product
          title={"Ebay Products"}
          hiddenTitle={hiddenEbayTitle}
          productList={ebayProducts}
          error={ebayError}
          hiddenError={hiddenError}
        ></Product>
        <Product
          title="Google Products"
          hiddenTitle={hiddenGoogleTitle}
          productList={googleProducts}
          error={googleError}
          hiddenError={hiddenError}
        ></Product>
      </div>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation>
          <Box display="flex" justifyContent="center" width="100%">
            <Pagination
              count={10}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
              hidden={hiddenPagination}
              sx={{
                zIndex: 1100,
                position: "fixed",
                bottom: 10,

                textAlign: "center",
                // marginLeft:"auto",
                // marginRight:"auto",
                justifyContent: "center",
              }}
            />
            
          </Box>
  
          <Typography color="#757575" sx={{ padding:2, width:170,  fontSize: 16,  textAlign:"left", right:22}}>
          © Copyright 2023
          </Typography>
        </BottomNavigation>
      </Paper>
    </Fragment>
  );
}
