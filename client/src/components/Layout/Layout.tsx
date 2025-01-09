import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Layout: React.FC = () => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleScrollToAbout = () => {
        const aboutSection = document.getElementById("about-section");
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleScrollToGallery = () => {
      const gallerySection = document.getElementById("gallery-section");
      if (gallerySection) {
          gallerySection.scrollIntoView({ behavior: "smooth" });
      }
  };

    const handleLogout = (): void => {
        localStorage.removeItem("currentUser");
        navigate("/login");
    };

    const handleCart = (): void => {
        navigate('/cart');
    }

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#D2B48C" }}>
                <Toolbar>
                    {/* דף הבית */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={Link} to="/home">
                            דף הבית
                        </Button>
                    </Typography>

                    {/* קצת עלינו */}
                    <Button color="inherit" onClick={handleScrollToAbout}>
                        קצת עלינו
                    </Button>

                    {/* חנות - Dropdown Menu */}
                    <Button
                        color="inherit"
                        onClick={handleMenuOpen}
                        aria-controls={open ? "shop-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        חנות
                    </Button>
                    <Menu
                        id="shop-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                    >
                        <MenuItem
                            onClick={handleMenuClose}
                            component={Link}
                            to="/shop/ready-signs"
                        >
                            שלטים מוכנים
                        </MenuItem>
                        <MenuItem
                            onClick={handleMenuClose}
                            component={Link}
                            to="/shop/custom-signs"
                        >
                            שלטים בהזמנה אישית
                        </MenuItem>
                    </Menu>

                    {/* גלריה */}
                    <Button color="inherit" onClick={handleScrollToGallery}>
                        גלריה
                    </Button>

                    {/* הסל שלי */}
                    <Button color="inherit" onClick={handleCart}>
                    <AddShoppingCartIcon fontSize="medium"/>
                    </Button>

                    {/* Logout */}
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* תוכן מרכזי */}
            <Box sx={{ p: 2 }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;
