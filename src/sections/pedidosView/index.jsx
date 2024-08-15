'use client';

import React, { useState } from "react";
import { Button, Container, Grid } from '@mui/material';
import BasicLayout from "@/layouts/basic/basiclayout";
import OrderCard from "@/components/OrderCard";
import BoxConfirnation from "@/components/boxConfirmation";
import EditOrderModal from "@/components/EditOrderModal";
import { useRouter, usePathname } from "next/navigation";

const initialOrders = [
  { id: 1, quantidade: 3, total: 250.00, status: 'Em Processamento' },
  { id: 2, quantidade: 3, total: 180.00, status: 'Concluído' },
  { id: 3, quantidade: 3, total: 250.00, status: 'Em Processamento' },
  { id: 4, quantidade: 3, total: 180.00, status: 'Concluído' },
  // Adicione mais pedidos conforme necessário
];

export default function PedidosView() {
  const [orders, setOrders] = useState(initialOrders);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/');
  };

  const handleOpenModal = (order) => {
    if (pathname === '/admin') {
      setSelectedOrder(order);
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const handleSaveStatus = (newStatus) => {
    if (selectedOrder) {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === selectedOrder.id ? { ...order, status: newStatus } : order
        )
      );
      handleCloseModal();
    }
  };

  const totalValue = orders
    .map(item => {
      const preco = parseFloat(item.total);
      const quanto = parseInt(item.quantidade, 10);
      return isNaN(preco) || isNaN(quanto) ? 0 : preco * quanto;
    })
    .reduce((acc, value) => acc + value, 0)
    .toFixed(2);

  const orderGrid = (
    <Grid container spacing={2} wrap="wrap">
      {orders.map((order) => (
        <Grid sx={{ marginBottom: 2 }} item xs={12} sm={6} md={4} key={order.id}>
          <OrderCard order={order} onClick={() => handleOpenModal(order)} />
        </Grid>
      ))}
    </Grid>
  );

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
        <Container maxWidth="" disableGutters={true} >
          <Container maxWidth="lg" sx={{
            minHeight: '100vh', marginBottom: '20vh'
          }}>
            {orderGrid}
            {orderButton}
          </Container>
          <BoxConfirnation valorFinal={totalValue} />
          {selectedOrder && (
            <EditOrderModal
              open={modalOpen}
              onClose={handleCloseModal}
              order={selectedOrder}
              onSave={handleSaveStatus}
            />
          )}
        </Container>
      ) : (
        <BasicLayout titulo="Pedidos">
          <Container maxWidth="" disableGutters={true} >
            <Container maxWidth="lg" sx={{ marginTop: -10, marginBottom: '20vh' }}>
              {orderGrid}
              {orderButton}
            </Container>
            <BoxConfirnation valorFinal={totalValue} />
          </Container>
        </BasicLayout>
      )}
    </>
  );
}
