import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // קרא את פרטי העגלה מ-localStorage
    const savedCartItems = localStorage.getItem('cart');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  const handleRemoveItem = (id: number) => {
    // סנן את הפריט עם ה-ID שנבחר
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);

    // עדכון localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCartItems));
  };

  const handlePaymaent = () => {
    navigate('/payment');
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto', direction: 'rtl' }}>
      <Typography variant="h6" sx={{ marginBottom: '16px', fontWeight: 'bold' }}>
         עגלת הקניות שלך:
      </Typography>

      {/* כותרות של הטבלה */}
      <Grid container spacing={2} sx={{ marginBottom: '20px', borderBottom: '1px solid #D2B48C', paddingBottom: '10px' }}>
        <Grid item xs={2}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>תמונה</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>סוג עץ</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>גודל</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>פיניש</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>איקון</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>הסרה</Typography>
        </Grid>
      </Grid>

      <Box sx={{ border: '1px solid #D2B48C', borderRadius: '8px', padding: '10px' }}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Box key={item.id}>
              <Grid container spacing={2} sx={{ marginBottom: '10px', alignItems: 'center' }}>
                {/* תמונה של הפריט */}
                <Grid item xs={2}>
                  <img src={item.image || '/path/to/default-image.jpg'} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '8px' }} />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">{item.wood}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">{item.size}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">{item.finish}</Typography>
                </Grid>
                <Grid item xs={2}>
                     {item.icons && item.icons.length > 0 ? (
                    <Typography variant="body1">{item.icons.join(', ')}</Typography>):
                     (<Typography variant="body1">ללא איקון</Typography>)
                    }
                    </Grid>

                <Grid item xs={2}>
                  <IconButton onClick={() => handleRemoveItem(item.id)} color="secondary">
                    <DeleteIcon />
                    <Typography variant="body2" sx={{ marginLeft: '8px' }}>הסר מהעגלה</Typography>
                  </IconButton>
                </Grid>
              </Grid>
              <Divider sx={{ marginBottom: '10px' }} />
            </Box>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary">אין פריטים בעגלה.</Typography>
          </Grid>
        )}
      </Box>

      {cartItems.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px' }}
          onClick={handlePaymaent}
        >
          המשך לתשלום
        </Button>
      )}
    </Box>
  );
};

export default Cart;
