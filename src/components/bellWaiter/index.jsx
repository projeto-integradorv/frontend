import React from "react";
import Fab from '@mui/material/Fab';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  transition: 'background-color 0.3s ease', // Adiciona transição suave para a cor de fundo
};

export default function BellWaiter() {
  return (
    <Fab
      sx={{
        color: 'white',
        backgroundColor: '#FF9800',
        ...fabStyle,
        '@media (max-width:600px)': {
          margin: 'auto',
          left: 0,
          right: 0,
          bottom: 16,
          top: 'auto',
          position: 'fixed',
        },
        '&:hover': {
          backgroundColor: '#fcc777', // Cor de fundo quando estiver em hover
        },
      }}
      aria-label="edit"
    >
      <RoomServiceOutlinedIcon />
    </Fab>
  );
}
