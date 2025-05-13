import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CartPreview from "../CartPreview/CartPreview";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

import { useAdmin } from "../AdminContext/AdminContext";

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [adminPassword, setAdminPassword] = useState("");
    const [error, setError] = useState("");

    const { isAdmin, loginAsAdmin, logoutAdmin } = useAdmin();

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleScrollToAbout = () => {
        if (window.location.pathname !== "/home") {
            navigate("/home", { state: { scrollTo: "about-section" } });
        } else {
            const aboutSection = document.getElementById("about-section");
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleScrollToGallery = () => {
        if (window.location.pathname !== "/home") {
            navigate("/home", { state: { scrollTo: "gallery-section" } });
        } else {
            const gallerySection = document.getElementById("gallery-section");
            if (gallerySection) {
                gallerySection.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleAdminLoginClick = () => {
        setIsDialogOpen(true);
    };

    const handleAdminLogin = () => {
        const success = loginAsAdmin(adminPassword);
        if (success) {
            setIsDialogOpen(false);
            setAdminPassword("");
            setError("");
        } else {
            setError("סיסמה שגויה");
        }
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#D2B48C" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={Link} to="/home">
                            דף הבית
                        </Button>
                    </Typography>

                    {/* כפתורים שזמינים רק למנהל */}
                    {isAdmin && (
                        <>
                            <Button color="inherit" component={Link} to="/admin/edit-ready-signs">
                                עריכת שלטים מוכנים
                            </Button>
                            <Button color="inherit" component={Link} to="/admin/edit-custom-signs">
                                עריכת שלטים בהזמנה אישית
                            </Button>
                        </>
                    )}

                    <Button color="inherit" onClick={handleScrollToAbout}>
                        קצת עלינו
                    </Button>

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

                    <Button color="inherit" onClick={handleScrollToGallery}>
                        גלריה
                    </Button>

                    <CartPreview />

                    {isAdmin ? (
                        <Button color="inherit" onClick={logoutAdmin}>
                            התנתקות
                        </Button>
                    ) : (
                        <Button color="inherit" onClick={handleAdminLoginClick}>
                            כניסת מנהל
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            {/* Dialog להזנת סיסמת מנהל */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>כניסת מנהל</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="סיסמה"
                        type="password"
                        fullWidth
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        error={!!error}
                        helperText={error}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDialogOpen(false)}>ביטול</Button>
                    <Button onClick={handleAdminLogin}>כניסה</Button>
                </DialogActions>
            </Dialog>

            <Box sx={{ p: 2 }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;
