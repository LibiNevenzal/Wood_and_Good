import {
  Dialog,
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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent>
        {product ? (
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }}>
            {/* התמונה בצד ימין */}
            <Box flex="1" display="flex" justifyContent="center" alignItems="center" p={2}>
              <img
                src={product.image_key}
                alt={product.name}
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Box>

            {/* תוכן בצד שמאל */}
            <Box flex="1" p={2}>
              <Typography variant="h3" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                מחיר: {product.price} ₪
              </Typography>
              <Typography variant="body1" gutterBottom>
                סוג עץ: {product.material_type_id}
              </Typography>
              <Typography variant="body1" gutterBottom>
                גודל: {product.size_id}
              </Typography>
              <TextField
                label="?מה תרצה לחרוט על השלט"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Box>
          </Box>
        ) : (
          <Typography>Loading product details...</Typography>
        )}
      </DialogContent>

      <DialogActions style={{ justifyContent: 'space-between', padding: '16px' }}>
        <Button
          onClick={onClose}
          style={{ backgroundColor: '#D2B48C', color: '#fff' }}
          variant="contained"
        >
          ביטול
        </Button>
        <Button
          onClick={onClose}
          style={{ backgroundColor: '#D2B48C', color: '#fff' }}
          variant="contained"
        >
          הוסף לעגלה
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
