import React from "react";
import { Button } from "@mui/material";
import Image from 'next/image';
import PropTypes from 'prop-types';

export default function CardCategory({ icon, nameCategory, onClick }) {
    return (
        <Button 
            onClick={onClick} 
            sx={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'white', 
                display: 'flex', 
                flexDirection: 'column', 
                marginRight: '1%', 
                padding: '10px', 
                gap: '10px', 
                flexGrow: 1, 
                margin: '10px', 
                borderRadius: '5px',
                textAlign: 'center'
            }}
        >
            <Image
                src={icon}
                width={60}
                height={60}
                alt="icon"
            />
            <p style={{ color: '#665858', margin: 0 }}>{nameCategory}</p>
        </Button>
    );
}

CardCategory.propTypes = {
    icon: PropTypes.string.isRequired,
    nameCategory: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired, 
};
