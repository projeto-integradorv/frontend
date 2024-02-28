import React from "react";
import { Button } from "@mui/material";
import Image from 'next/image';



export default function CardCategory({ icon , nameCategory}) {
    return (
        <Button href="#contained-buttons" sx={{ width: '10%', height: '16%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', marginRight: '1%', padding: '10px', gap: '10px',flexBasis:'calc(16.666% - 20px)',flexGrow:'1',margin:'10px'}}>
            <Image
                src={icon}
                width={'100%'}
                height={'100%'}
                sx={{ borderRadius: '50%', backgroundColor: '#665858' }}
            />
            <p style={{ color: '#665858' }}>{nameCategory}</p>
        </Button>
    )
}