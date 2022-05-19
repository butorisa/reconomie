import React, { useEffect, useState } from 'react'
import { AppBar, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'

type Payment = {
    key: number,
    title: string,
    amount: number,
    date: string
}

/**
 * 支出一覧画面
 */
const Payment = () => {
    const [paymentList, setPaymentList] = useState<Payment[]>([]);

    useEffect(() => {
        let payments: Payment[] = [];
        Object.keys([...Array(10)]).map(e => {
            payments.push({
                key: Number(e),
                title: `雑貨${e}`,
                amount: Number(e) * 1000,
                date: `2022/5/${e}`
            });
        });
        setPaymentList(payments);
    }, []);

    return (
        <>
        <AppBar>
            <Toolbar>
                <Typography>今月の支出</Typography>
            </Toolbar>
        </AppBar>
        <List id="paymentList">
            {paymentList.map(e => {
                return (
                    <ListItem>
                        <ListItemText>{e.date}</ListItemText>
                        <ListItemText>{e.title}</ListItemText>
                        <ListItemText>{e.amount}</ListItemText>
                    </ListItem>
                );
            })}
        </List>
        </>
    );
}

export default Payment;