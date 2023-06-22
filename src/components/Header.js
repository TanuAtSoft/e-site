import { useState, useRef } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link, createSearchParams, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useMediaQuery } from "react-responsive";
import { getSearchAutoComplete } from "../apis/products/getSearchAutoComplete";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

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
const useStyles = {
  dropdown: {
    "&.MuiAutocomplete-root .MuiAutocomplete-inputRoot": {
      padding: "0px !important",
      fontSize: "14px",
      color: "#1E5EF3",
      fontWeight: 500
    }
  }
};

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  // pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  top: "0px",
  zIndex: "9999",
  right: "0px",
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
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
  const [searchedText, setSearchedText] = useState("");
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [suggestions, setSuggestions] = useState([{name:""}]);
  const inputRef = useRef("inputRef")
  const navItems =
    role === "SELLER"
      ? [
          { label: "Dashboard", link: "" },
          { label: "Add Product", link: "addProduct" },
          { label: "Manage Products", link: "manageProducts" },
          { label: "Oders", link: "orders" },
        ]
      : [
          { label: "Best Seller", link: "bestSeller" },
          { label: "Top Rated", link: "topRated" },
          { label: "Best Deals", link: "bestDeals" }
          // { label: "Add Product", link: "addProduct" },
          // { label: "Manage Products", link: "manageProducts" },
          // { label: "HeightLights", link: "heighlights" },
        ];
  const categoryNavlinks = [
    { label: "Men's Fashion", link: "men's clothing" },
    { label: "Women's Fashion", link: "women's clothing" },
    { label: "Girl's Fashion", link: "girl's clothing" },
    { label: "Boy's Fashion", link: "boy's clothing" },
    { label: "Electronics", link: "electronics" },
    { label: "Baby's Fashion", link: "baby's clothing" },
    { label: "Toys", link: "toys" },
  ];
  const handleProfileMenuOpen = (event) => {
    if (token) {
      setAnchorEl(event.currentTarget);
    }
    if (!token) {
      navigate("/login");
    }
  };
  const handleSearchChange = async(e) => {
    const res = await getSearchAutoComplete(e.target.value)
    if(res.data.statusCode === 200){
      setSuggestions(res.data.data)
    }
     setSearchedText(e.target.value);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleProfileClick =() =>{
    navigate("/profile")
  }

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
      <MenuItem onClick={()=>{handleMenuClose();handleProfileClick()}}>Profile</MenuItem>
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

      {role !== "SELLER" && (
        <Typography variant="h6" disablePadding>
          Trending
        </Typography>
      )}

      <List>
        {navItems.map((item, id) => (
          <ListItem
          disablePadding
            key={id}
            onClick={() => handleSideNavLinks(item.link)}
          >
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <br />
      {role !== "SELLER" && (
        <Typography variant="h6" disablePadding>
          Shop By Category
        </Typography>
      )}

      {role !== "SELLER" && (
        <List>
          {categoryNavlinks.map((item, id) => (
            <Link
              key={id}
              className="cat-link"
              to={{
                pathname: "/category",
                search: `?category=${item.link}`,
              }}
            >
              <ListItem
                key={item}
                disablePadding
                // disablePadding
                // onClick={() => handleSideNavCatLinks(item.link)}
              >
                <ListItemButton sx={{ textAlign: "center" }}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
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
            <Stack spacing={1} sx={{ width: 300 }}>
              <Search>
                <Autocomplete
                  onChange={(e,v)=> setSearchedText(v)}
                   id="custom-input-demo"
                   className={useStyles}
                  options={suggestions.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                    ref={inputRef}
                      {...params}
                      // label="Search"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                      onChange={(e) => handleSearchChange(e)}
                    />
                  )}
                
                />
                
                {/* <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleSearchChange(e)}
              /> */}

                <SearchIconWrapper
                  onClick={(e) => {
                    e.preventDefault();
                    navigate({
                      pathname: "/",
                      search: createSearchParams({
                        search: searchedText,
                      }).toString(),
                    });
                  }}
                >
                  {/* <Link
                  className="link"
                  to={{
                    pathname: "/",
                    search: `?search=${searchedText}`,
                  }}
                > */}
                  <SearchIcon
                    onClick={() => {
                      // navigate({
                      //   pathname: "/",
                      //   search: createSearchParams({
                      //     search: searchedText,
                      //   }).toString(),
                      // });
                    }}
                  />
                  {/* </Link> */}
                </SearchIconWrapper>
              </Search>
              {/* <div className="suggestions">
             {suggestionsActive && <Suggestions />}
             </div> */}
            </Stack>
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
