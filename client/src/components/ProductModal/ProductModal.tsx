import React, { FC, useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import { getRequest } from "../Tools/APIRequests";
import axios from 'axios';

// קומפוננטת המודל
interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  productId: string | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, productId }) => {
  const [productDetails, setProductDetails] = useState<any>(null);
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (open && productId) {
      axios
        .get(`/api/products/${productId}`)
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
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{productDetails?.name || 'Loading...'}</DialogTitle>
      <DialogContent>
        {productDetails ? (
          <Box>
            <Typography variant="body1" gutterBottom>
              {productDetails.description}
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
              <img
                src={productDetails.image}
                alt={productDetails.name}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
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
          disabled={!productDetails}
        >
          Add to Cart
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProductModal;
