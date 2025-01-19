// import React, { FC, useState } from 'react';
// import { Grid, Card, CardContent, CardMedia, Typography, Link } from '@mui/material';
// import { useEffect } from 'react';
// interface ReadySignsProps {}

// const ReadySigns: FC<ReadySignsProps> = () => {

  

//     const products = [
//         {
//             id: 1,
//             imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/98031_sunset_over_mevasherit_zion_PikiWiki_Israel.jpg/800px-98031_sunset_over_mevasherit_zion_PikiWiki_Israel.jpg',
//             name: 'מוצר 1',
//             description: 'תיאור של מוצר 1',
//             price: 100
//         },
//         {
//             id: 2,
//             imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/PikiWiki_Israel_86371_palm_trees.jpg/800px-PikiWiki_Israel_86371_palm_trees.jpg',
//             name: 'מוצר 2',
//             description: 'תיאור של מוצר 2',
//             price: 150
//         },
//         {
//             id: 3,
//             imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/PikiWiki_Israel_78796_a_poplar_at_the_banias_site.jpg/800px-PikiWiki_Israel_78796_a_poplar_at_the_banias_site.jpg',
//             name: 'מוצר 3',
//             description: 'תיאור של מוצר 3',
//             price: 200
//         },
//         {
//             id: 4,
//             imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/PikiWiki_Israel_57338_tal_shahar_ziziphus.jpg/800px-PikiWiki_Israel_57338_tal_shahar_ziziphus.jpg',
//             name: 'מוצר 4',
//             description: 'תיאור של מוצר 4',
//             price: 250
//         }
//     ];

//     // const [products , setProducts] = useState<null>;
 
//     return (
//         <Grid container spacing={2}>
//             {products.map(product => (
//                 <Grid item xs={12} sm={6} md={3} key={product.id}>
//                     <Link href={`/product/${product.id}`} underline="none">
//                         <Card>
//                             <CardMedia
//                                 component="img"
//                                 height="140"
//                                 image={product.imageUrl}
//                                 alt={product.name}
//                             />
//                             <CardContent>
//                                 <Typography variant="h6" gutterBottom>
//                                     {product.name}
//                                 </Typography>
//                                 <Typography variant="body2" color="textSecondary">
//                                     מחיר: ${product.price}
//                                 </Typography>
//                             </CardContent>
//                         </Card>
//                     </Link>
//                 </Grid>
//             ))}
//         </Grid>
//     );
// };

// export default ReadySigns;











import React, { FC, useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getRequest } from "../Tools/APIRequests";
import ProductModal from '../ProductModal/ProductModal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  woodType: string;
  imageUrl: string;
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
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card onClick={() => handleCardClick(product)} style={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                height="140"
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  מחיר: {product.price} ₪
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ProductModal open={isModalOpen} onClose={handleCloseModal} product={selectedProduct} />
    </>
  );
};

export default ReadySigns;
