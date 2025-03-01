import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: any | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => {
  const [engravingText, setEngravingText] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!engravingText.trim()) {
      setError(true);
      return;
    }
    
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      wood: product.material_type_id,
      size: product.size_id,
      engravingText: engravingText,
      image: product.image_key
    };
    
    cartItems.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    onClose();
    navigate('/cart');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        {product ? (
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
            {/* תמונה */}
            <Box flex="1" display="flex" justifyContent="center" alignItems="center" p={2}>
              <img
                src={product.image_key}
                alt={product.name}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>

            {/* פרטי מוצר */}
            <Box flex="1" p={2}>
              <Typography variant="h3" gutterBottom>{product.name}</Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>מחיר: {product.price} ₪</Typography>
              <Typography variant="body1" gutterBottom>סוג עץ: {product.material_type_id}</Typography>
              <Typography variant="body1" gutterBottom>גודל: {product.size_id}</Typography>
              
              <TextField
                label="?מה תרצה לחרוט על השלט"
                variant="outlined"
                fullWidth
                margin="normal"
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                error={error}
                helperText={error ? 'שדה זה חובה' : ''}
              />
            </Box>
          </Box>
        ) : (
          <Typography>Loading product details...</Typography>
        )}
      </DialogContent>

      <DialogActions style={{ justifyContent: 'space-between', padding: '16px' }}>
        <Button onClick={onClose} style={{ backgroundColor: '#D2B48C', color: '#fff' }} variant="contained">
          ביטול
        </Button>
        <Button onClick={handleAddToCart} style={{ backgroundColor: '#D2B48C', color: '#fff' }} variant="contained">
          הוסף לעגלה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;

