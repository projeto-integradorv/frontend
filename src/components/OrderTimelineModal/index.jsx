import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { buscarPedidoPorId } from '@/lib/features/pedidos/pedidoSlice';

const TimelineModal = ({ open, onClose, orderId }) => {
  const dispatch = useDispatch();
  const selectedOrder = useSelector(state => state.pedidos.selectedOrder);
  const [orderStatus, setOrderStatus] = useState('');


  useEffect(() => {
    if (orderId) {
      dispatch(buscarPedidoPorId(orderId?.id));
    }
  }, [orderId, dispatch]);

  useEffect(() => {
    if (selectedOrder) {
      setOrderStatus(selectedOrder.order_status);
    }
  }, [selectedOrder]);

  const steps = [
    'Pendente',
    'Aceito',
    'Em preparo',
    'Pronto para entrega',
    'Em entrega',
    'Entregue com sucesso',
    'Não encontrado'
  ];

  const getActiveStep = (status) => {
    return steps.indexOf(status);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
        <Typography variant="h6" mb={2}>
          Status do Pedido #{orderId.order_status }
        </Typography>
        <Stepper activeStep={getActiveStep(orderStatus)} orientation="vertical">
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
