import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import { Pagination } from "@mui/material";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useFormik } from "formik";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from "@mui/icons-material/Home";
import SpringModal from "../Modal/SpringModal";
import { Logout } from "../../components/Users/Logout/Logout";
import { useUser } from "../../auth/useUser";
import { useCookies } from "react-cookie";
export function SearchAppBar() {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  function gotoHome() {
    navigate("/");
  }
  const navigate = useNavigate();
  function gotoProfile() {
    navigate("/profile");
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
    gotoProfile();
  };
  const useAuth = (data: any, cookie: { logged_in?: any }) => {
    if (!data) {
      return false;
    } else if (data.sub.role === "user") {
      return true;
    }
  };
  function LoggedIn() {
    const [cookie] = useCookies(["logged_in"]);
    const data = useUser();
    const auth = useAuth(data, cookie);
    
    return auth ? <Logout /> : <SpringModal  />;
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} className="navbar">
        <AppBar position="fixed">
          <Toolbar>
            <Tooltip title="Home">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={gotoHome}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Welcome
            </Typography>
            <LoggedIn />
            
            {auth && (
              <div>
                <Tooltip title="Profile">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={gotoProfile}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleCloseProfileMenu}>Profile</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
