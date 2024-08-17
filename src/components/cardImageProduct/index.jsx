import { useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";
import ImageProduct from "@/assets/x-bacon.jpeg";

export default function CardImageProduct({ produto }) {
  const [loading, setLoading] = useState(false);

  console.log(produto, 'produto - cardImageProduct')

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="40vh">
        <CircularProgress sx={{ color: '#FF9800' }} />
      </Box>
    );
  }

  if (!produto) {
    return <Typography>Produto não encontrado</Typography>;
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
      <Grid item xs={12} md={5} sx={{ padding:2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box
          sx={{
            width:'100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            borderRadius: '10px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: { xs: 2, md: 1},
          }}
        >
          <Image
            src={produto.image || ImageProduct}
            alt="Imagem do produto"
            objectFit='cover'
            
            width={400}
            height={300}
            sizes="100%"
            borderRadius="20px"
            style={{ borderRadius: '20px' }}
          />
        </Box>
      </Grid>

      <Grid item xs={12} md={7} sx={{ width:"100%", display: 'flex', flexDirection: 'column', padding: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 500, color: '#fff', mb: 1 }}>
          {produto.name || 'Nome do produto'}
        </Typography>
        <Typography variant="h6" component="h2" sx={{ color: '#fff', mb: 2 }}>
          A partir de R$ {produto.price || '0.00'}
        </Typography>
        <Typography variant="body1" sx={{ color: '#fff', lineHeight: 1.5 }}>
          {produto.description || 'Descrição do produto'}
        </Typography>
      </Grid>
    </Grid>
  );
}
