import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";

const CartPreview: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const savedCartItems = localStorage.getItem("cart");
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);
    
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const open = Boolean(anchorEl);
    const id = open ? "cart-popover" : undefined;
    
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };
    
    return (
        <>
            <IconButton color="inherit" onClick={handleOpen}>
                <AddShoppingCartIcon fontSize="medium" />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{ width: 300, p: 2, direction: "rtl" }}>
                    <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
                        עגלת הקניות
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    {cartItems.length > 0 ? (
                        <>
                            {cartItems.map((item) => (
                                <Card key={item.id} sx={{ display: "flex", mb: 1, p: 1, alignItems: "center" }}>
                                    <CardMedia
                                        component="img"
                                        image={item.image || "/path/to/default-image.jpg"}
                                        alt={item.name}
                                        sx={{ width: 50, height: 50, borderRadius: "8px" }}
                                    />
                                    <CardContent sx={{ flex: 1, textAlign: "center" }}>
                                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>{item.name}</Typography>
                                        <Typography variant="body2">סוג עץ: {item.wood}</Typography>
                                        <Typography variant="body2">גודל: {item.size}</Typography>
                                        <Typography variant="body2">פיניש: {item.finish}</Typography>
                                        <Typography variant="body2">חריטה: {item.engravingText}</Typography>
                                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>מחיר: {item.price} ש"ח</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                            <Divider sx={{ my: 1 }} />
                            <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
                                סה"כ: {getTotalPrice()} ש"ח
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
                                <Button variant="outlined" color="primary" onClick={() => navigate("/cart")}>
                                    לעגלת הקניות
                                </Button>
                                <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={() => navigate("/payment")}>
                                    לתשלום
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: "center" }}>
                            אין פריטים בעגלה.
                        </Typography>
                    )}
                </Box>
            </Popover>
        </>
    );
};

export default CartPreview;
