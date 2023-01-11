import { useState, useEffect, useRef } from "react";
import { Fragment } from "react";
import ProductDataService from "../../services/ProductDataService";
import Product from "../Products/Product";
import { ProductData } from "../../types/product";
import { Button, TextField, Pagination } from "@mui/material/";
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
  const limit: number = 20;
  const [searchWordPagination, setSearchhWordPagination] = useState<string>("");
  const [hiddenFacebookTitle, setHiddenFacebookTitle] = useState<boolean>(true);
  const [hiddenEbayTitle, setHiddenEbayTitle] = useState<boolean>(true);
  const [hiddenGoogleTitle, setHiddenGoogleTitle] = useState<boolean>(true);
  const [hiddenPagination, setHiddenPagination] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hiddenError, setHiddenError] = useState<boolean>(true);
  const [ebayProducts, setEbayProducts] = useState<ProductData[] | undefined>();

  const [facebookProducts, setFacebookProducts] = useState<
    ProductData[] | undefined
  >();
  const [googleProducts, setGoogleProducts] = useState<
    ProductData[] | undefined
  >();
  const [ebayError, setEbayError] = useState<string>("");
  const [facebookError, setFacebookError] = useState<string>("");
  const [googleError, setGoogleError] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      searchWord: "",
    },
    validationSchema: searchWordValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const searchWord: string = values.searchWord;
      setSearchhWordPagination(values.searchWord);
      setCurrentPage(1);
      let offset: number = 0;

      try {
        const responseFacebook =
          await ProductDataService.findFacebookProductsBySearchWord(
            searchWord,
            offset
          );
        console.log("facebook", responseFacebook);
        if (responseFacebook.status === 200) {
          setFacebookProducts(responseFacebook.data.facebookData.itemList);
          setHiddenFacebookTitle(false);
          setHiddenError(true);
        }
      } catch (error: any) {
        console.log(error.response.data);
        setHiddenFacebookTitle(false)
        setFacebookProducts([])
        setFacebookError(error.response.data.error)
      }
      try {
        const responseEbay =
          await ProductDataService.findEbayProductsBySearchWord(
            searchWord,
            limit,
            offset
          );
        if (responseEbay.status === 200) {
          // console.log(response.data.ebayData)
          setEbayProducts(responseEbay.data.ebayData.itemList);
          setHiddenPagination(false);
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
      // try {
      //   const responseGoogle =
      //     await ProductDataService.findGoogleProductsBySearchWord(
      //       searchWord,
      //       offset
      //     );
      //   if (responseGoogle.status === 200) {
      //     // console.log(response.data.ebayData)
      //     setGoogleProducts(responseGoogle.data.googleData.itemList);
      //     setHiddenPagination(false);
      //     setHiddenGoogleTitle(false);
      //     setHiddenError(true);
      //   }
      // } catch (error: any) {
      //   console.log(error.response.data);
      //   setGoogleError(error.response.data.error);
      //   setHiddenError(false);
      //   setHiddenGoogleTitle(false);
      //   setGoogleProducts([]);
      //   setHiddenPagination(true);
      // }
      resetForm({
        values: {
          searchWord: "",
        },
      });
    },
  });

  function handleSearchWordChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const word = event.target.value;
    if (!word.length) return false;
    if (word) {
      setSearchhWordPagination(word);
    }
  }
  // useEffect(() => {
  //   const data: string | null = window.sessionStorage.getItem(
  //     "itemList_currentPage"
  //   ) as string;
  //   if (!data) {
  //     setFacebookProducts([]);
  //     setEbayProducts([]);
  //     setGoogleProducts([]);
  //     setHiddenPagination(false);
  //   }
  //   if (data !== null) {
  //     let pageData: {
  //       facebookData: [];
  //       ebayData: [];
  //       googleData: [];
  //       offset: string;
  //     } = JSON.parse(data);
  //     setFacebookProducts(pageData.facebookData);
  //     setEbayProducts(pageData.ebayData);
  //     setGoogleProducts(pageData.googleData);
  //     setHiddenPagination(true);
  //   }
  // }, []);
  const handleKeyDown = (
    event: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //@ts-ignore
    if (event.key === "Enter")
      //@ts-ignore
      formik.handleChange;
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    let offset: number = (page - 1) * limit;
    console.log("offset", offset);
    try {
      ProductDataService.findEbayProductsBySearchWord(
        searchWordPagination,
        limit,
        offset
      ).then((response) => {
        console.log(response);
        setFacebookProducts([]);
        setHiddenFacebookTitle(true)
        setEbayProducts(response.data.ebayData.itemList);
        // setGoogleProducts(response.data.googleData);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
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

        <Product
          title="Facebook Products"
          hiddenTitle={hiddenFacebookTitle}
          productList={facebookProducts}
          error={facebookError}
          hiddenError={hiddenError}
        ></Product>

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

      <div className="pagination">
        <Pagination
          count={10}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
          hidden={hiddenPagination}
          sx={{zIndex: 1100,position: "fixed", bottom:30,width:'100%', textAlign:'center', left:0, justifyContent:"center"}}
        />

      </div>
    </Fragment>
  );
}
