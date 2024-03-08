import { Container, Grid } from "@mui/material";
import React from "react";
import CardCategory from "../cardCategory";
import ImageMassa from '../../assets/Vector.png';
import Imagelanches from '../../assets/lanches.png';

export default function Categorias() {
    return (
        <Container maxWidth='lg' sx={{ backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems:'center'}} disableGutters={true}>
            <Grid container spacing={3} sx={{ width:"100%", marginBottom: '1%',display:"flex" , justifyContent:'center' }}>
                {['Massas', 'Massas', 'Massas', 'Massas', 'Massas', 'Massas', 'Lanches', 'Lanches', 'Lanches', 'Lanches', 'Lanches', 'Lanches'].map((category, index) => (
                    <Grid item key={index} xs={6} sm={6} md={3}>
                        <CardCategory icon={category.includes('Massas') ? ImageMassa : Imagelanches} nameCategory={category} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
