import {getProductById} from '@/api/product';
import ImageProduct from "@/assets/x-bacon.jpeg";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CardImageProduct({ Id }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(Id);
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao obter o produto por ID:", error);
      }
    };
    fetchProduct();
  }, [Id]);

  // Verifica se o produto ainda está sendo carregado
  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <>
    <Grid
      container
      sx={{
        width: "100%",
        padding: 0,
        backgroundColor: '#FF9800',
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        height: '40vh',
        margin: 0,
        flexDirection: ''
      }}
      spacing={3}
    >
      <Grid item xs={12} md={8} sx={{
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' }
      }}>
        <Box
          width={{ xs: "100%", md: "35%" }}
          display={'flex'}
          height={'100%'}
          justifyContent={'center'}
          marginBottom={{ xs: "0", md: "0" }}
          sx={{ marginY: 0, borderRadius: '10px', '@media (max-width: 768px)': { width: '95%', height: 350, justifyContent: 'center', margin: 0, paddingRight: 2 }, '@media (max-width: 912px) and (max-width: 1024px)': { paddingLeft: '1rem', paddingRight: '1rem' } }}
        >
          <Image
            src={product.image || ImageProduct}
            alt={'Imagem do produto'}
            objectFit='cover'
            objectPosition='center center'
            height={300}
            width={300}
            style={{ borderRadius: '10px', '@media (max-width: 768px)': { width: '100%', height: 400 } }}
          />
        </Box>

        <Box
          display={'flex'}
          flexDirection={'column'}
          whiteSpace={'wrap'}
          width={{ xs: '100%', md: '70%' }}
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          height={'26rem'}
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            fontWeight: 400,
            paddingLeft: '2rem', paddingY: '4rem', marginY: 5,
            '@media (max-width: 600px)': { width: "95%", color: "black", margin: 3, padding: 0, height: '100%', marginY: '-1%', textAlign: 'left' },
            '@media (max-width:768px) and (max-width: 1026px)': { paddingLeft: '1rem', marginLeft: 2 }
          }}
        >
          <Typography variant="h3" component="h1">
            {product.name} {/* Exibindo o nome do produto */}
          </Typography>
          <Typography variant="h6" component="h3">
            A partir de R${product.price} {/* Exibindo o preço do produto */}
          </Typography>
          <Typography sx={{ fontWeight: 400 }} variant="h7" component="h4">
            {product.description} {/* Exibindo a descrição do produto */}
          </Typography>
        </Box>
      </Grid>
    </Grid>
    
    </>
  );
}
