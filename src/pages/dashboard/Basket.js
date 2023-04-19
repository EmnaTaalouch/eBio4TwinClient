import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell ,Button, Grid} from '@mui/material';  
import { PATH_DASHBOARD } from '../../routes/paths';
import {orderApi} from '../../actions/basketAction'



const Basket = () => {
  
  const [products, setProducts] = useState([]);

 const { currentUser } = useSelector((state) => state.user);
 const userId =  currentUser._id;

//   useEffect(() => { 
    const fetchBasket = async () => {
      try {
        const response = await orderApi.showBasket(userId)
        // console.log(response)
        setProducts(response);
      } catch (error) {
        console.error('Failed to fetch basket:', error);
      }
    };

    useEffect(() => { 
        fetchBasket();
      }, []);
//   },[]);

  const deletFromBasket = async ( id )  =>  {

    try {

      
      
      console.log(id);
      
      const response = await orderApi.deleteFromBasket(userId,id)
      
      
      fetchBasket();
      
      
      
      console.log(response)
    //   setProducts(response);
    } catch (error) {
      console.error('Failed delete product from the basket:', error);
    }
  };

  console.log(products);


  return (
    <div>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Total price</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
    
      {products.length > 0 ? (
      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>  
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.quantity * product.price}</TableCell>
            <TableCell>
                <Button variant="contained" color="error"  onClick={( ) => deletFromBasket(product.productId)} >
                  Delete
                </Button>
              </TableCell>
          </TableRow>
          
        ))}
      </TableBody>
      
    ) : (
      <tbody>
        <tr>
          {/* <td colSpan="3">Loading...</td> */}
          <td />
        </tr>
      </tbody>
    )}
      
    </Table>
    <Grid item xs={12}>
        <Link to={PATH_DASHBOARD.eCommerce.order}>
            <Button variant="contained">Order</Button>
          </Link>
        </Grid>
    </div>
  );
};

export default Basket;