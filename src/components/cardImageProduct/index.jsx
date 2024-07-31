import { getProductById } from '@/api/product';
import ImageProduct from "@/assets/x-bacon.jpeg";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CardImageProduct({ Id }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(Id);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter o produto por ID:", error);
      }
    };
    fetchProduct();
  }, [Id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
        <CircularProgress sx={{ color: '#FF9800' }} />
      </Box>
    );
  }

  return (
    <Grid
      container
      sx={{
        width: '100%',
        padding: 0,
        backgroundColor: '#FF9800',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'auto',
        margin: 0,
        flexDirection: { xs: 'column', md: 'row' },
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          sx={{
            borderRadius: '10px',
            overflow: 'hidden',
            
          }}
        >
          <Image
            src={product.image || ImageProduct}
            alt="Imagem do produto"
            objectFit="cover"
            objectPosition="center center"
            height={300}
            width={350}
            style={{ borderRadius: '10px' }}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column', padding: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 500, color: '#fff', mb: 1 }}>
          {product.name}
        </Typography>
        <Typography variant="h6" component="h2" sx={{ color: '#fff', mb: 2 }}>
          A partir de R$ {product.price}
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff', lineHeight: 1.5 }}>
          {product.description}
        </Typography>
      </Grid>
    </Grid>
  );
}
