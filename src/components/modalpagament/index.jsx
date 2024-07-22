import React from "react";
import { Button, Container, Grid, Modal, Box, Typography } from '@mui/material';
import Image from "next/image";
import Voltar from '@/assets/voltar.png';
import BoxConfirmation from "../boxConfirmation";

export default function ModalPagamento({ isOpen, onClose, nomeProduto, imagemProduto, descricaoProduto }) {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box margin={0} padding={0} sx={{ position: 'absolute', top: '0', right: '0', width: '400px', height: '100%', bgcolor: '#E5E5E5' }}>
        <Container maxWidth={''} disableGutters={true} sx={{margin:0}}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} width={'100%'}>
              <Button onClick={onClose} sx={{ position: 'absolute',gap:1 ,top: '10px', left: '10px', backgroundColor:'orange', color: 'white', zIndex: 1 }}> <Image src={Voltar} width={8} /> Voltar</Button>
              <div style={{ width:'100%',marginBottom:10}}>
                <Image 
                width={400}
                height={300}
                src={imagemProduto} 
                
                />
              </div>
              <Typography sx={{marginLeft:3}} variant="h4" align='left' gutterBottom>{nomeProduto}</Typography>
              <Typography sx={{marginLeft:3}} variant="body1" align="left">{descricaoProduto}</Typography>
            </Grid>
          </Grid>
        </Container>
        <BoxConfirmation />
      </Box>
    </Modal>
  );
}
