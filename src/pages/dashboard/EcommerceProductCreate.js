/* eslint-disable */
import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
// @mui
import { Container, Alert } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../sections/@dashboard/e-commerce/ProductNewEditForm';
import { use } from 'i18next';
import { UserApi } from '../../actions/userAction';
import axios from 'axios';

// ----------------------------------------------------------------------

const SuccessAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { products } = useSelector((state) => state.product);
  const isEdit = pathname.includes('edit');
  const [showMessage, setShowMessage] = useState(false);
  const [user, setUser] = useState({name:'',});

const getCurrentUser = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log(token);
    const { data } = await axios.get(`http://localhost:5000/user/profile/${token}`);
    console.log(data.firstName);
    const user = await setUser({name:data.firstName})
    console.log(user);
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  getCurrentUser();
  console.log(user);
}, []);

  useEffect(() => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 10000);
  }, []);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="Ecommerce: Create a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new product' : 'Edit product'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: !isEdit ? 'New product' : name },
          ]}
        />

        {showMessage && (
          <SuccessAlert variant="filled" severity="success">
            Hey <strong> mr </strong>,
            <br />
            If you don't have a picture for your product, our eBio will set one for, a high qualty one!
          </SuccessAlert>
        )}

        <ProductNewEditForm isEdit={isEdit} />
        {/* currentProduct={currentProduct} */}
      </Container>
    </Page>
  );
}