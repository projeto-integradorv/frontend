import BasicLayout from "@/layouts/basic/basiclayout";
import { List } from "@mui/material";
import React from "react";
import ListTables from "../../components/listTables";


export default function TableView() {
    return (
        <>
            <BasicLayout titulo={'Mesas'}>
                <ListTables tables={[]} />
            </BasicLayout>

        </>
    );
}