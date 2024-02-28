import React from "react";
import { Button } from "@mui/material";



export default function CardCategory() {
    return (
        <Button href="#contained-buttons" sx={{ width: '10%', height: '16%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', marginRight: '1%', padding: '10px', gap: '10px' }}>
            <Image
                src={MassasImg}
                alt="Massas"
                width={'100%'}
                height={'100%'}
                sx={{ borderRadius: '50%', backgroundColor: '#665858' }}
            />
            <p style={{ color: '#665858' }}>Massas</p>
        </Button>
    )
}