import { useState , useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { styled } from '@mui/material/styles';
import { Link as RouterLink ,Link  } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { OneKPlusOutlined } from '@mui/icons-material';

import Basket from './Basket';

import {orderApi } from '../../actions/basketAction';
import { PATH_DASHBOARD } from '../../routes/paths';




const RootStyle = styled(RouterLink)(({ theme }) => ({
    zIndex: 999,
    right: 0,
    display: 'flex',
    cursor: 'pointer',
    position: 'fixed',
    alignItems: 'center',
    top: theme.spacing(16),
    height: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.25),
    boxShadow: theme.customShadows.z20,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
    borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
    transition: theme.transitions.create('opacity'),
    '&:hover': { opacity: 0.72 },
  }));
const Order = () => {

  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;
  const [products, setProducts] = useState([]);

  const fetchBasket = async () => {
    try {
      const response = await orderApi.showBasket(userId);
      // console.log(response)
      setProducts(response);
    } catch (error) {
      console.error('Failed to fetch basket:', error);
    }
  };

  useEffect(() => { 
    fetchBasket();
  }, []);



//   const { products } = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const [consumptionDate, setConsumptionDate] = useState(new Date());
  const [members, setMembers] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const totalPrice = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleCreateOrder = async () => {
    try {
    //   const order = {
    //     consumptionDate,
    //     members,
    //   };
      const response = await orderApi.createOrder(currentUser._id, consumptionDate,
        members);
        setAlertMessage(`Order submitted successfuly !  Thank you !! `);              
      if (response.success) {
         OneKPlusOutlined.log(response);
      } else {
        console.log(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Checkout</Typography>
        </Grid>
        <Grid item xs={12}> 
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Order n° 
              </Typography>
              {products.map((product) => (
                <Box key={product._id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ mr: 2 }}>
                    <img src={product.image} alt={product.name} width={50} />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2">
                      {product.quantity} x {product.price} = {product.quantity * product.price}
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Total:
                 {totalPrice}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Delivery information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom value={consumptionDate}
                  onChange={(e) => setConsumptionDate(e.target.value)}>
                  Consumption date
                </Typography>
                <input
                  type="date"
                  
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom value={members}
                  onChange={(e) => setMembers(e.target.value)}>
                  Members
                </Typography>
                <input
                  type="text"
                  
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleCreateOrder} >
            Place order
          </Button>
          {alertMessage && (
              <div className="alert">{alertMessage}</div>
            )}
        </Grid>
        <Grid item xs={12}>
        <RootStyle to={PATH_DASHBOARD.eCommerce.basket}>
            <Button variant="contained">Back to basket</Button>
          </RootStyle>
        </Grid>
        </Grid>
        </Box>
        );
}

export default Order;