import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
// import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { orderApi } from '../../actions/basketAction';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getAllOrders();
        setOrders(response);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (

    // <Grid container spacing={2}>
    //     <Grid item xs={12}>
    //       <Typography variant="h4">Checkout</Typography>
    //     </Grid>
    //     <Grid item xs={12}> 
    //       <Card>
    //         <CardContent>
    //           <Typography variant="h5" gutterBottom>
    //             Order n° 
    //           </Typography>
    //           {/* {products.map((product) => ( */}
    //             <Box  sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    //               <Box sx={{ flexGrow: 1 }}>
    //                 <Typography variant="subtitle1" gutterBottom>
    //                   new
    //                 </Typography>
    //                 <Typography variant="body2">
    //                   kkk
    //                 </Typography>
    //               </Box>
    //             </Box>
    //           {/* ))} */}
    //           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
    //             Total:
                 
    //           </Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    // </Grid>
    // </Grid>
     <Table>
      <TableHead>
        <TableRow>
          <TableCell>Order Number</TableCell>
          <TableCell>State</TableCell>
          <TableCell>Products</TableCell>
          <TableCell>Total Price</TableCell>
          <TableCell>Consumption Date</TableCell>
          <TableCell>Members</TableCell>
          <TableCell />
        </TableRow>
      </TableHead> 
    
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell>{order.orderNumber}</TableCell>
            <TableCell>{order.state}</TableCell>
            <TableCell>
              {/* <ul>
                {order.ref.map((product) => ( <li  key={product._id}>{product.price} {console.log(product)}</li>
                ))
                }
              </ul> */}
              <Button variant="contained" onClick={() => navigate(`/dashboard/e-commerce/showProducts/${order._id}`) } >
                   Products
                </Button>
            </TableCell>
            <TableCell>{order.somme}</TableCell>
            <TableCell>{order.consumptionDate}</TableCell>
            <TableCell>{order.members}</TableCell>
            <TableCell>
                <Button variant="contained" onClick={() => navigate(`/dashboard/cxpForm/addCxpForm/${order._id}`)}  >
                   Comment
                </Button>
              </TableCell>

        

          </TableRow>
        ))}
      </TableBody> 
     </Table> 
  );
};

export default OrderList;