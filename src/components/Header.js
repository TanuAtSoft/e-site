// import React from "react";
// import { useState, useEffect, useMemo } from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import CartWithNotif from "./CartWithNotif";
// import SearchIcon from '@mui/icons-material/Search';
// import { styled, alpha } from '@mui/material/styles';
// import InputBase from '@mui/material/InputBase';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// const pages = ["Products", "Pricing", "Blog"];
// const sellerPages = [{ label: "Add Products", path: "/addProduct" }];
// const LogoutSettings = ["Profile", "Account", "Orders", "Logout"];
// const LoginSettings = [{ label: "SignIn", link: "/login" }];
// const SignUpSettings = [{ label: "SignUp", link: "/register" }];

// const Header = () => {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const localStorageRole = localStorage.getItem("role");
//   const role = useMemo(() => {
//     return localStorage.getItem("role");
//   }, [localStorageRole]);

//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");

//   useEffect(() => {
//     if (token) {
//       setLoggedIn(true);
//     }
//   }, [token]);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };
//   const handleChange = (setting) => {
//     // console.log("setting", setting);
//     if (setting === "Logout") {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("role");
//       localStorage.removeItem("cart");
//       setLoggedIn(false);
//       navigate("/loggedOut");
//     }
//     if(setting === "Orders"){
//       navigate("/orders")
//     }
//   };
//   return (
//     <AppBar position="static">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//          <img src="./logo192.png" alt="logo" style={{maxWidth:"112px",cursor:"pointer"}} onClick={()=>{navigate("/")}}/>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>

//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: "bottom",
//                 horizontal: "left",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "left",
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: "block", md: "none" },
//               }}
//             >
//               {role !== "SELLER" &&
//                 pages.map((page) => (
//                   <MenuItem key={page} onClick={handleCloseNavMenu}>
//                     <Typography textAlign="center">{page}</Typography>
//                   </MenuItem>
//                 ))}
//               {role === "SELLER" &&
//                 sellerPages.map((page) => (
//                   <MenuItem key={page} onClick={handleCloseNavMenu}>
//                     <Typography textAlign="center">
//                       <Link to={page.path} className="link">
//                         {page.label}
//                       </Link>
//                     </Typography>
//                   </MenuItem>
//                 ))}
//               {location.pathname === "/register" &&
//                 !loggedIn &&
//                 LoginSettings.map((page) => (
//                   <MenuItem key={page.label} onClick={handleCloseNavMenu}>
//                     <Typography textAlign="center">
//                       <Link to={page.link} className="link">
//                         {page.label}
//                       </Link>
//                     </Typography>
//                   </MenuItem>
//                 ))}
//               {location.pathname === "/login" &&
//                 SignUpSettings.map((page) => (
//                   <MenuItem key={page.label} onClick={handleCloseNavMenu}>
//                     <Typography textAlign="center">
//                       <Link to={page.link} className="link">
//                         {page.label}
//                       </Link>
//                     </Typography>
//                   </MenuItem>
//                 ))}
//             </Menu>
//             <MenuItem onClick={() => {}}>
//               <Typography textAlign="center" component="div">
//                 <CartWithNotif />
//               </Typography>
//             </MenuItem>
//           </Box>
//           <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "inherit",
//               textDecoration: "none",
//             }}
//           >
//             LOGO
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {role !== "SELLER" &&
//               pages.map((page) => (
//                 <Button
//                   key={page}
//                   onClick={handleCloseNavMenu}
//                   sx={{ my: 2, color: "white", display: "block" }}
//                 >
//                   {page}
//                 </Button>
//               ))}
//             {role === "SELLER" &&
//               sellerPages.map((page) => (
//                 <Button
//                   key={page}
//                   onClick={handleCloseNavMenu}
//                   sx={{ my: 2, color: "white", display: "block" }}
//                 >
//                   <Link to={page.path} className="link">
//                     {" "}
//                     {page.label}
//                   </Link>
//                 </Button>
//               ))}
//           </Box>

//           <Box
//             sx={{
//               flexGrow: 1,
//               display: { xs: "none", md: "flex", flexDirection: "row-reverse" },
//             }}
//           >
//             <MenuItem onClick={() => {}}>
//               <Typography textAlign="center" component="div">
//                 <CartWithNotif />
//               </Typography>
//             </MenuItem>
//             {(location.pathname === "/register" || location.pathname === "/") &&
//               !loggedIn &&
//               LoginSettings.map((page) => (
//                 <MenuItem key={page.label} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">
//                     <Link to={page.link}>{page.label}</Link>
//                   </Typography>
//                 </MenuItem>
//               ))}
//             {location.pathname === "/login" &&
//               SignUpSettings.map((page) => (
//                 <MenuItem key={page.label} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">
//                     <Link to={page.link}>{page.label}</Link>
//                   </Typography>
//                 </MenuItem>
//               ))}
//           </Box>

//           {loggedIn && (
//             <Box sx={{ flexGrow: 0 }}>
//               <Tooltip title="Open settings">
//                 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                   <Avatar
//                     alt={user ? user.split("")[1] : "G"}
//                     src="/static/images/avatar/2.jpg"
//                   />
//                 </IconButton>
//               </Tooltip>
//               <Menu
//                 sx={{ mt: "45px" }}
//                 id="menu-appbar"
//                 anchorEl={anchorElUser}
//                 anchorOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 keepMounted
//                 transformOrigin={{
//                   vertical: "top",
//                   horizontal: "right",
//                 }}
//                 open={Boolean(anchorElUser)}
//                 onClose={handleCloseUserMenu}
//               >
//                 {loggedIn &&
//                   LogoutSettings.map((setting) => (
//                     <MenuItem key={setting} onClick={handleCloseUserMenu}>
//                       <Typography
//                         textAlign="center"
//                         onClick={() => handleChange(setting)}
//                       >
//                         {setting}
//                       </Typography>
//                     </MenuItem>
//                   ))}
//               </Menu>
//             </Box>
//           )}
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
// export default Header;

import { Fragment, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useMediaQuery } from "react-responsive";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
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
  justifyContent: "center",
  top: "0px",
  right: "0px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const Header = ({ wishlist, cart, handleCartCount, handleWsihlistCount }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const token = JSON.parse(localStorage.getItem("token"));
  const role = localStorage.getItem("role");
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const navItems =
    role === "SELLER"
      ? [
          { label: "Dashboard", link: "" },
          { label: "Add Product", link: "addProduct" },
          { label: "Manage Products", link: "manageProducts" },
          { label: "Oders", link: "orders" },
        ]
      : [
          { label: "Home", link: "" },
          // { label: "Add Product", link: "addProduct" },
          // { label: "Manage Products", link: "manageProducts" },
          // { label: "HeightLights", link: "heighlights" },
        ];
  const handleProfileMenuOpen = (event) => {
    if (token) {
      setAnchorEl(event.currentTarget);
    }
    if (!token) {
      navigate("/login");
    }
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleCartClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/cart");
    }
  };
  const handleWishlistClick = () => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/wishlist");
    }
  };
  const handleOrder = () => {
    navigate("/orders");
  };
  const handleLogout = () => {
    handleCartCount(null);
    handleWsihlistCount(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/loggedOut");
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      {role === "BUYER" && (
        <MenuItem
          onClick={() => {
            handleMenuClose();
            handleOrder();
          }}
        >
          My Orders
        </MenuItem>
      )}
      <MenuItem
        onClick={() => {
          handleMenuClose();
          handleLogout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {(!role || role === "BUYER") && (
        <MenuItem onClick={() => handleCartClick()}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={cart} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      )}
      {(!role || role === "BUYER") && (
        <MenuItem onClick={() => handleWishlistClick()}>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
          >
            <Badge badgeContent={wishlist} color="error">
              <FavoriteIcon />
            </Badge>
          </IconButton>
          <p>Wishlist</p>
        </MenuItem>
      )}

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
  };
  const handleSideNavLinks = (link) => {
    navigate(`/${link}`);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      style={{ width: "200px" }}
    >
      <MenuItem style={{ cursor: "default" }}>
        <img src="./drawerlogo.png" alt="logo" style={{ maxWidth: "112px" }} />
      </MenuItem>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item}
            disablePadding
            onClick={() => handleSideNavLinks(item.link)}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, maxWidth: "1400px", margin: "auto" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Box component="nav">
            <Drawer
              anchor="left"
              open={open}
              onClose={() => {
                setOpen((prevState) => !prevState);
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          {!isTabletOrMobile && (
            <IconButton
              onClick={() => {
                navigate("/");
              }}
            >
              <img
                src="./logo192.png"
                alt="logo"
                style={{ maxWidth: "112px", cursor: "pointer" }}
              />
            </IconButton>
          )}
          {role !== "SELLER" && (
            <Search>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {(!role || role === "BUYER") && (
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => handleWishlistClick()}
              >
                <Badge badgeContent={wishlist} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            )}
            {(!role || role === "BUYER") && (
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => handleCartClick()}
              >
                <Badge badgeContent={cart} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            )}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};
export default Header;
