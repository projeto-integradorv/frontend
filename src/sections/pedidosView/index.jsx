'use client';
import React, { useEffect } from "react";
import { Button, Container, Grid } from '@mui/material';
import BasicLayout from "@/layouts/basic/basiclayout";
import OrderCard from "@/components/OrderCard";
import BoxConfirmation from "@/components/boxConfirmation";
import EditOrderModal from "@/components/EditOrderModal";
import TimelineModal from "@/components/OrderTimelineModal";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { buscarPedidos, atualizarPedido } from "@/lib/features/pedidos/pedidoSlice";

export default function PedidosView() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(state => state.pedidos.orders);
  const pathname = usePathname();
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [timelineOpen, setTimelineOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState(null);

  useEffect(() => {

    if (pathname === '/pedidos') {
      const fetchOrders = () => {
        dispatch(buscarPedidos());
      };

      fetchOrders();
      const intervalId = setInterval(fetchOrders, 1000);

      return () => clearInterval(intervalId);
    }

    dispatch(buscarPedidos());
  }, [dispatch]);


  const handleRedirect = () => {
    router.push('/');
  };

  const handleOpenModal = (order) => {
    if (pathname === '/admin') {
      const fullOrder = orders.find(o => o.id === order.id);
      setSelectedOrder(fullOrder);
      setModalOpen(true);
    } else {
      setSelectedOrder(order);
      setTimelineOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCloseTimeline = () => {
    setTimelineOpen(false);
    setSelectedOrder(null);
  };

  const handleSaveStatus = (newStatus) => {
    if (selectedOrder) {
      dispatch(atualizarPedido({ id: selectedOrder.id, status: newStatus }));
      handleCloseModal();
    }
  };

  const totalValue = orders
    .map(item => {
      const preco = parseFloat(item.total) || 0;
      const quantidade = parseInt(item.quantidade, 10) || 0;
      return preco * quantidade;
    })
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);

  // Grid de pedidos
  const orderGridAdmin = (
    <Grid container spacing={2} wrap="wrap">
      {orders.map((order) => (
        <Grid sx={{ marginBottom: 2 }} item xs={12} sm={6} md={4} key={order.id}>
          <OrderCard order={order} onClick={() => handleOpenModal(order)} />
        </Grid>
      ))}
    </Grid>
  );

  // Botão para adicionar mais itens
  const orderButton = (
    <Button
      onClick={handleRedirect}
      sx={{
        width: '100%',
        color: 'white',
        border: '2px solid #ff9800',
        backgroundColor: '#ff9800',
        '&:hover': {
          backgroundColor: '#fda116',
          borderColor: '#fda116',
          color: 'white',
        },
        fontSize: '16px',
        padding: '12px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '@media (max-width: 600px)': {
          width: '90%',
        }
      }}
    >
      Adicionar mais itens
    </Button>
  );

  return (
    <>
      {pathname === '/admin' ? (
        <Container maxWidth="" disableGutters={true}>
          <Container maxWidth="lg" sx={{ minHeight: '100vh' }}>
            {orderGridAdmin}
          </Container>
          {selectedOrder && (
            <EditOrderModal
              open={modalOpen}
              onClose={handleCloseModal}
              orderId={selectedOrder}
              onSave={handleSaveStatus}
            />
          )}
        </Container>
      ) : (
        <BasicLayout titulo="Pedidos">
          <Container maxWidth="" disableGutters={true}>
            <Container maxWidth="lg" sx={{ marginTop: -10, marginBottom: '20vh' }}>
              {orderGridAdmin}
              {orderButton}
            </Container>
          </Container>
        </BasicLayout>
      )}
      {selectedOrder && (
        <TimelineModal
          open={timelineOpen}
          onClose={handleCloseTimeline}
          orderId={selectedOrder} // Passe o pedido selecionado ao modal de linha do tempo
        />
      )}
    </>
  );
}
