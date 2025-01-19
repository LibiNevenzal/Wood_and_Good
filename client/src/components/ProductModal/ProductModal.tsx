import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  TextField,
  Box
} from '@mui/material';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: any | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{product?.name || 'Loading...'}</DialogTitle>
      <DialogContent>
        {product ? (
          <Box>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>
            <Typography variant="h6" gutterBottom>
              מחיר: {product.price} ₪
            </Typography>
            <Typography variant="body2">
              סוג עץ: {product.woodType}
            </Typography>
          </Box>
        ) : (
          <Typography>Loading product details...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          ביטול
        </Button>
        <Button onClick={onClose} color="primary">
          הוסף לעגלה
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ProductModal;
