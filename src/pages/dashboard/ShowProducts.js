import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Typography } from '@mui/material';
// import { Grid, Card, CardContent, Box, Typography } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
// import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { orderApi } from '../../actions/basketAction';

const ShowProducts = () => { 
  const { id } = useParams()
  console.log(id);
  const [order, setOrder] = useState();
  const navigate = useNavigate();

  
  useEffect(( ) => {
    const fetchOrders = async () => {
      try {
        const response = await orderApi.getOrderById(id);
        console.log(response)
        setOrder(response);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };
    fetchOrders();
  }, [ ]);

  
  console.log(order)

  return (
     <div>
    <ul>
      {order && order.ref && order.ref.map((product,index) => (
        <li key={index} product={product} > 
        {console.log(product)} {product?.name}
        </li>
      ))}
    </ul>
      </div>
    

  );
};


export default ShowProducts;