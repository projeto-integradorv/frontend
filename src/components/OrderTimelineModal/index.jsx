import React from 'react';
import { Modal, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';

const TimelineModal = ({ open, onClose, order }) => {
  if (!order) return null;

  const steps = [
    'Pedido Recebido',
    'Preparando',
    'Pronto para Envio',
    'Em Rota de Entrega',
    'Entregue'
  ];

  const getActiveStep = (status) => {
    switch (status) {
      case 'Recebido':
        return 0;
      case 'Preparando':
        return 1;
      case 'Pronto para Envio':
        return 2;
      case 'Em Rota de Entrega':
        return 3;
      case 'Concluído':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography variant="h6" mb={2}>
          Status do Pedido #{order.id}
        </Typography>
        <Stepper activeStep={getActiveStep(order.status)} orientation="vertical">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Modal>
  );
};

export default TimelineModal;
