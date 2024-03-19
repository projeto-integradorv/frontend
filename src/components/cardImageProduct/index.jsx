import ImageProduct from "@/assets/x-bacon.jpeg";
import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import FormAdd from "../FormAdd";

export default function CardImageProduct({ titulo, imagem, preco, descricao, children}) {
  return (
    <Grid container sx={{ width: "100%", padding: 0, backgroundColor: '#FF9800', display: 'flex', justifyContent: "center", alignItems: "center", height: '40vh', margin: 0, flexDirection:'' }} spacing={3}>
      <Grid item xs={12} md={8} sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
        <Box
          width={{ xs: "100%", md: "35%" }} // Alterado para ocupar 100% no celular
          display={'flex'}
          height={'100%'}
          justifyContent={'center'}
          marginBottom={{ xs: "0", md: "0" }}
          sx={{ marginY: 0, borderRadius: '10px', '@media (max-width: 768px)': { width: '95%', height: 350, justifyContent: 'center', margin: 0, paddingRight: 2 }, '@media (max-width: 912px) and (max-width: 1024px)': { paddingLeft: '1rem', paddingRight: '1rem' } }} // Estilização para dispositivos com largura máxima de 600px (celulares)
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
            paddingLeft: '2rem', paddingY: '4rem', marginY: 5,
            '@media (max-width: 600px)': {  width:"95%",color: "black", margin:3, padding:0, height:'100%',  marginY:'-1%', textAlign:'left'}, // Mudança da cor do texto para preto em dispositivos móveis
            '@media (max-width:768px) and (max-width: 1026px)': { paddingLeft: '1rem', marginLeft:2 } // Ajuste de padding para dispositivos com largura entre 912px e 1024px
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
