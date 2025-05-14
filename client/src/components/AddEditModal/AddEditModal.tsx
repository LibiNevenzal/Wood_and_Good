import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { postRequest, putRequest } from "../Tools/APIRequests";

interface Product {
  id?: number;
  name: string;
  price: number;
  material_type: string;
  image_key: string;
  size: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  mode: "add" | "edit";
}

const AddEditModal: React.FC<Props> = ({ open, onClose, product, mode }) => {
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: 0,
    material_type: "",
    image_key: "",
    size: "",
  });

  useEffect(() => {
    if (product && mode === "edit") {
      setFormData(product);
    } else {
      setFormData({
        name: "",
        price: 0,
        material_type: "",
        image_key: "",
        size: "",
      });
    }
  }, [product, mode]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (mode === "edit" && product?.id) {
      await putRequest("readySigns", formData, product.id, (msg) => console.log(msg));
    } else {
      await postRequest("readySigns", formData, (msg) => console.log(msg));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} dir="rtl">
      <DialogTitle>{mode === "edit" ? "עריכת שלט" : "הוספת שלט חדש"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="שם השלט"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="price"
          label="מחיר"
          type="number"
          fullWidth
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="material_type"
          label="סוג עץ"
          fullWidth
          value={formData.material_type}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="image_key"
          label="קישור לתמונה"
          fullWidth
          value={formData.image_key}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="size"
          label="גודל"
          fullWidth
          value={formData.size}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          שמור
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditModal;
