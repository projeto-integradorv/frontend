import React, { useState } from 'react';
import { Modal, Box, Typography, Button, Select, MenuItem } from '@mui/material';

function EditOrderModal({ open, onClose, order, onSave }) {
  const [newStatus, setNewStatus] = useState(order ? order.status : '');

  const handleChangeStatus = (event) => {
    setNewStatus(event.target.value);
  };

  const handleSave = () => {
    if (order && newStatus) {
      onSave(newStatus);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyles }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          Alterar Status do Pedido #{order ? order.id : ''}
        </Typography>
        <Typography variant="subtitle1">Status Atual: {order ? order.status : ''}</Typography>
        <Select
          value={newStatus}
          onChange={handleChangeStatus}
          fullWidth
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          <MenuItem value="Em Processamento">Em Processamento</MenuItem>
          <MenuItem value="Concluído">Concluído</MenuItem>
          <MenuItem value="Cancelado">Cancelado</MenuItem>
          {/* Adicione mais opções conforme necessário */}
        </Select>
        <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
          Salvar Alterações
        </Button>
      </Box>
    </Modal>
  );
}

const modalStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default EditOrderModal;
