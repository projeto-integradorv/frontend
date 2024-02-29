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
        <Fab  sx={{color:'white', backgroundColor:'#FF9800', ...fabStyle}} aria-label="edit">
            <RoomServiceOutlinedIcon />
        </Fab>
    );

}