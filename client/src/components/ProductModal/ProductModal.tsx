import React, { FC, useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import axios from 'axios';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  productId: string; // ID של המוצר שמתקבל
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, productId }) => {
  const [productDetails, setProductDetails] = useState<any>(null); // לשמור נתוני מוצר
  const [inputValue, setInputValue] = useState<string>(''); // תוכן שיכניס המשתמש

  // שליפת נתוני מוצר מהשרת
  useEffect(() => {
    if (open && productId) {
      axios
        .get(`/api/products/${productId}`) // קריאה לשרת לקבלת פרטי מוצר
        .then((response) => {
          setProductDetails(response.data);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
        });
    }
  }, [open, productId]);

  const handleAddToCart = () => {
    console.log(`Adding to cart: ${productDetails.name}, Input: ${inputValue}`);
    // כאן אפשר להוסיף לוגיקה להוספה לסל
    onClose(); // לסגור את המודל אחרי ההוספה
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{productDetails?.name || 'Loading...'}</DialogTitle>
      <DialogContent>
        {productDetails ? (
          <Box>
            {/* תיאור המוצר */}
            <Typography variant="body1" gutterBottom>
              {productDetails.description}
            </Typography>

            {/* תמונת המוצר */}
            <Box display="flex" justifyContent="center" mb={2}>
              <img
                src={productDetails.image}
                alt={productDetails.name}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>

            {/* שדה להכנסת תוכן */}
            <TextField
              label="Add your notes"
              fullWidth
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              multiline
              rows={3}
              variant="outlined"
            />
          </Box>
        ) : (
          <Typography>Loading product details...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleAddToCart}
          color="primary"
          disabled={!productDetails} // כפתור מושבת אם אין נתונים
        >
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
