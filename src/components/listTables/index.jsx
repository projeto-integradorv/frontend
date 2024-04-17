import React from "react";
import { Container, Grid } from "@mui/material";

export default function ListTables({ tables }) {
    return (
        <Container>
            <h1>ListTables</h1>
            <Grid container spacing={2}>
                {tables.map((table) => (
                    <Grid item key={table.id} xs={12} sm={6} md={4}>
                        <div>
                            <h2>Mesa {table.number}</h2>
                            <p>Status: {table.status}</p>
                            {/* Aqui você pode adicionar mais informações sobre a mesa, se necessário */}
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
