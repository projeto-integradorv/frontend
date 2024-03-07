import { Container, Grid } from "@mui/material";
import React from "react";
import CardFood from "../cardFodd";
import ImageHamburguer from '../../assets/x-salada.jpg';


export default function CardapioContainer() {
    return (
        <>
            <Container maxWidth='lg' sx={{ backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }} disableGutters={true}>
                <Grid container spacing={2}>
                    {[1, 2, 3, 4,5,6,7,8,9,10,11,12].map((item) => (
                        <Grid item key={item} xs={12} sm={6} md={3}>
                            <CardFood
                                nome={'X-Salada'}
                                descricao={"Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam"}
                                imagem={ImageHamburguer} preco={'12,00'}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
