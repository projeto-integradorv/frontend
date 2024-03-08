import React from "react";
import Fab from '@mui/material/Fab';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';

const fabStyle = {
  position: 'fixed',
  bottom: 16,
  right: 16,
};

export default function BellWaiter() {
  return (
    <Fab sx={{
      color: 'white',
      backgroundColor: '#FF9800',
      ...fabStyle,
      '@media (max-width:600px)': { // Apply styles only for screens with width <= 600px (mobile devices)
        margin: 'auto',
        left: 0,
        right: 0,
        bottom: 16,
        top: 'auto',
        position: 'fixed',
      },
    }} aria-label="edit">
      <RoomServiceOutlinedIcon />
    </Fab>
  );
}
