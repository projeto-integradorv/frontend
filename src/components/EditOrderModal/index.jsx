import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemText, Autocomplete, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { buscarPedidoPorId, atualizarPedido } from '@/lib/features/pedidos/pedidoSlice';
import Swal from 'sweetalert2';
import '../categoria/Swall.css';

export default function OrderModal({ open, onClose, orderId }) {
  const dispatch = useDispatch();
  const selectedOrder = useSelector(state => state.pedidos.selectedOrder);
  const status = useSelector(state => state.pedidos.status);
  const error = useSelector(state => state.pedidos.error);
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

  const handleUpdateStatus = () => {
    if (selectedOrder) {
      if (orderStatus === 'Entregue' || orderStatus === 'Cancelado') {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não é possível modificar um pedido entregue ou cancelado.',
          // Opcional: ajuste do z-index do Swal
          customClass: {
            container: 'swal-container'
          }
        });
        return;
      }

      const previousStatus = selectedOrder.order_status;
      const statusOrder = ['Pendente', 'Aceito', 'Em preparo', 'Pronto para entrega', 'Em entrega', 'Entregue', 'Não encontrado'];
      const currentStatusIndex = statusOrder.indexOf(orderStatus);
      const previousStatusIndex = statusOrder.indexOf(previousStatus);

      if (currentStatusIndex < previousStatusIndex) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Não é possível retroceder o status do pedido.',
          // Opcional: ajuste do z-index do Swal
          customClass: {
            container: 'swal-container'
          }
        });
        return;
      }

      dispatch(atualizarPedido({
        id: orderId?.id,
        order_status: orderStatus,
        cart: selectedOrder.cart?.id,
        customer: selectedOrder.customer,
        payment_type: selectedOrder.payment_type,
        order_type: selectedOrder.order_type
      }));
      dispatch(buscarPedidoPorId(orderId?.id));
    }
  };

  const renderItems = () => {
    if (selectedOrder && selectedOrder.cart && selectedOrder.cart.items.length > 0) {
      return (
        <List>
          {selectedOrder.cart.items.map(item => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`Produto ID: ${item.product.name}`}
                secondary={
                  <Box>
                    <Typography variant="body2">Quantidade: {item.quantity}</Typography>
                    <Typography variant="body2">Observação: {item.observation}</Typography>
                    <Typography variant="body2">Adicionais: {item.additionals}</Typography>
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      );
    }
    return <Typography>Nenhum item encontrado.</Typography>;
  };

  const statusOptions = [
    { label: 'Pendente', value: 'Pendente' },
    { label: 'Aceito', value: 'Aceito' },
    { label: 'Em preparo', value: 'Em preparo' },
    { label: 'Pronto para entrega', value: 'Pronto para entrega' },
    { label: 'Em entrega', value: 'Em entrega' },
    { label: 'Entregue com sucesso', value: 'Entregue' },
    { label: 'Não encontrado', value: 'Não encontrado' },
  ];

  const renderContent = () => {
    if (status === 'loading') {
      return <Typography>Carregando...</Typography>;
    }

    if (status === 'failed') {
      return <Typography>Erro: {error}</Typography>;
    }

    if (selectedOrder) {
      return (
        <Box>
          <Typography variant="h6">Pedido #{selectedOrder.id}</Typography>
          <Typography>Tipo: {selectedOrder.order_type}</Typography>
          <Typography>Status: {selectedOrder.order_status}</Typography>
          <Typography>Pagamento: {selectedOrder.payment_type}</Typography>
          <Typography>Cliente: {selectedOrder.customer}</Typography>
          <Typography>Total: {selectedOrder.total_price}</Typography>
          <Typography>Observação: {selectedOrder.observation}</Typography>
          <Typography variant="h6">Itens do Pedido:</Typography>
          {renderItems()}
          <Box mt={2}>
            <Autocomplete
              options={statusOptions}
              getOptionLabel={(option) => option.label}
              value={statusOptions.find(option => option.value === orderStatus) || null}
              onChange={(event, newValue) => {
                if (newValue) {
                  setOrderStatus(newValue.value);
                }
              }}
              renderInput={(params) => <TextField {...params} label="Atualizar Status" variant="outlined" />}
            />
            <Button
              variant="contained"
              onClick={handleUpdateStatus}
              sx={{ mt: 2, backgroundColor: '#FF9800', color: 'white', "&:hover": { backgroundColor: '#FF9800' } }}
            >
              Atualizar Status
            </Button>
          </Box>
        </Box>
      );
    }

    return null;
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="order-modal" // Adiciona a classe para o modal
    >
      <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: '8px', maxWidth:{xs:'90%' , md:'800px'}, mx: 'auto', mt: '5%', maxHeight: '80vh', overflowY: 'auto' }}>
        {renderContent()}
      </Box>
    </Modal>
  );
}
