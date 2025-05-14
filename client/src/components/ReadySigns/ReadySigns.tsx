import React, { FC, useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getRequest } from "../Tools/APIRequests";
import ProductModal from '../ProductModal/ProductModal';

interface Product {
  id: number;
  name: string;
  price: number;
  material_type: string;
  image_key: string;
  size: string;
}

const ReadySigns: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getRequest("readySign", "?_limit=10", setProducts, setError, "שלט");
        setLoading(false);
      } catch (err) {
        setError("שגיאה בטעינת הנתונים");
        setLoading(false);
      }
    };

    fetchData();
    console.log("Products: ", products);
  }, []);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) return <div>טעינה...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Grid container spacing={2} style={{ direction: "rtl" }}>
        {products.map((product) => {
          console.log("Image URL: ", product.image_key);
          return (
            <Grid item xs={12} sm={6} md={3} key={product.id}>
              <Card 
                onClick={() => handleCardClick(product)} 
                style={{ cursor: 'pointer', textAlign: "right" }} // מיישר הכל לימין
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={product.image_key || 'default-image-url'}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom style={{ textAlign: "right" }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" style={{ textAlign: "right" }}>
                    מחיר: {product.price} ₪
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <ProductModal open={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
    </>
  );
};

export default ReadySigns;
