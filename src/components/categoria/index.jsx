import { Container, Button, Card } from "@mui/material";
import CardCategory from "../cardCategory";
import React from "react";
import ImageMassa from '../../assets/Vector.png';
import Imagelanches from '../../assets/lanches.png';

export default function Categoria() {
    return (
        <Container maxWidth='lg' sx={{ backgroundColor: 'transparent', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <Container maxWidth='xl' sx={{ backgroundColor: 'transparent', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1%',flexWrap:'wrap', }} disableGutters={true}>
                <CardCategory icon={ImageMassa} nameCategory={'Massas'}/>
                <CardCategory icon={ImageMassa} nameCategory={'Massas'}/>
                <CardCategory icon={ImageMassa} nameCategory={'Massas'}/>
                <CardCategory icon={ImageMassa} nameCategory={'Massas'}/>
                <CardCategory icon={ImageMassa} nameCategory={'Massas'}/>
                <CardCategory icon={ImageMassa} nameCategory={'Massas'}/>
                <CardCategory icon={Imagelanches} nameCategory={'Lanches'}/>
                <CardCategory icon={Imagelanches} nameCategory={'Lanches'}/>
                <CardCategory icon={Imagelanches} nameCategory={'Lanches'}/>
                <CardCategory icon={Imagelanches} nameCategory={'Lanches'}/>
                <CardCategory icon={Imagelanches} nameCategory={'Lanches'}/>
                <CardCategory icon={Imagelanches} nameCategory={'Lanches'}/>
            </Container>
        </Container>
    );
}
