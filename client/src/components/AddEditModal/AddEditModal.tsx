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
  id?: string;
  name: string;
  price: number;
  material_type_id: string;
  image_key: string;
  size_id: string;
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
    material_type_id: "",
    image_key: "",
    size_id: "",
  });

  useEffect(() => {
    if (product && mode === "edit") {
      setFormData(product);
    } else {
      setFormData({
        name: "",
        price: 0,
        material_type_id: "",
        image_key: "",
        size_id: "",
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
      await putRequest("readySign", formData, product.id, (msg) => console.log(msg));
    } else {
      await postRequest("readySign", formData, (msg) => console.log(msg));
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
          name="material_type_id"
          label="סוג עץ (ID)"
          fullWidth
          value={formData.material_type_id}
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
          name="size_id"
          label="גודל (ID)"
          fullWidth
          value={formData.size_id}
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
