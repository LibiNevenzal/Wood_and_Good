import React, { FC, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { getRequest, deleteRequest } from "../Tools/APIRequests";
import AddEditModal from "../AddEditModal/AddEditModal"; // נניח שזו קומפוננטת מודל להוספה ועריכה

interface Product {
  id: number;
  name: string;
  price: number;
  material_type: string;
  image_key: string;
  size: string;
}

const EditReadySigns: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSucceed, setIsSucceed] = useState<string>("");


  const fetchData = async () => {
    try {
      setLoading(true);
      await getRequest("readySign", "", setProducts, setError, "שלט");
      setLoading(false);
    } catch (err) {
      setError("שגיאה בטעינת הנתונים");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("האם אתה בטוח שברצונך למחוק?");
    if (confirmed) {
      const success = await deleteRequest("readySign", id, setIsSucceed);
      if (success) {
        fetchData(); // טען מחדש
      }
    }
  };
  
  

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedProduct(null); // הוספה
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedProduct(null);
    fetchData(); // טען מחדש אחרי עדכון
  };

  if (loading) return <div>טוען...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Grid container spacing={2} style={{ direction: "rtl" }}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card style={{ textAlign: "right" }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image_key || "default-image-url"}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  מחיר: {product.price} ₪
                </Typography>
                <Stack direction="row" spacing={1} mt={1}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEditClick(product)}
                  >
                    ערוך
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product.id)}
                  >
                    מחק
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} textAlign="center">
        <Button variant="contained" color="success" onClick={handleAddClick}>
          הוסף שלט חדש
        </Button>
      </Box>

      <AddEditModal
        open={isEditModalOpen || isAddModalOpen}
        onClose={handleModalClose}
        product={selectedProduct}
        mode={selectedProduct ? "edit" : "add"}
      />
    </>
  );
};

export default EditReadySigns;

