import React from "react";
import Image from "next/image";
import { Box, Grid, Typography } from "@mui/material";
import ImageProduct from "@/assets/x-bacon.jpeg";

export default function CardImageProduct({ titulo, imagem, preco, descricao }) {
  return (
    <Grid container sx={{ width: "100%", padding: 0, backgroundColor: '#FF9800', display: 'flex', justifyContent: "center", alignItems: "center", height: '40vh', margin: 0 }} spacing={3}>
      <Grid item xs={12} md={8} sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box
          width={{ xs: "100%", md: "35%" }} // Alterado para ocupar 100% no celular
          display={'flex'}
          height={'100%'}
          justifyContent={'center'}
          marginBottom={{ xs: "0", md: "0" }}
          sx={{ marginY: 0, borderRadius: '10px', '@media (max-width: 768px)': { width: '90%', height: 350, justifyContent: 'center', margin: 0, paddingRight: 2 } }} // Estilização para dispositivos com largura máxima de 600px (celulares)
        >
          <Image
            src={ImageProduct}
            alt={'Imagem do produto'}
            objectFit='cover'
            objectPosition='center center'
            height={300}
            width={300}
            style={{ borderRadius: '10px', '@media (max-width: 768px)':{width: '100%', height:400} }} // Modificado para ocupar 100% do container
          />
        </Box>

        <Box
          display={'flex'}
          flexDirection={'column'}
          whiteSpace={'wrap'}
          width={{ xs: '100%', md: '70%' }} // Alterado para ocupar 100% no celular
          justifyContent={'flex-start'}
          alignItems={'flex-start'}
          height={'26rem'}
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            fontWeight: 400,
            paddingLeft: '2rem', paddingTop: '4rem', marginY: '2rem',
            '@media (max-width: 768px)': {  width:"100%",color: "black", paddingTop:12, margin:0  } // Mudança da cor do texto para preto em dispositivos móveis
          }}
        >
          <Typography variant="h3" component="h1">
            X-Bacon
          </Typography>
          <Typography variant="h6" component="h3">
            A partir R$ 25,00
          </Typography>
          <Typography sx={{fontWeight:400}} variant="h7" component="h4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius esse nemo cumque eos, rem quaerat soluta, nesciunt minus error suscipit eum sunt illo at neque dicta consequatur non ratione laboriosam?
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
