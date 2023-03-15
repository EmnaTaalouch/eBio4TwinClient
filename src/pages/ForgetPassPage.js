import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button ,  IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui

import { LoadingButton } from '@mui/lab';

import { PassApi } from '../actions/userAction';

// hooks
import useResponsive from '../hooks/useResponsive';
// sharedComponents
import Logo from '../sharedComponents/logo';









// sections
// import { ForgetForm } from '../sections/auth/forget';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ForgetPassPage() {
  const mdUp = useResponsive('up', 'md');

  const [email, setEmail] = useState('');  

  const navigate = useNavigate();

  

const handleClick = () => {
    navigate('/dashboard', { replace: true });}

   
const handleEmailChange = (event) => {
          setEmail(event.target.value);
        };
      


        
const handleSubmit = async (event) => {
          event.preventDefault();
          try {
            const response = await PassApi.forgetPassword({email});
            const Link = await PassApi.forgetPassword.Link;
            console.log(Link)
            console.log(response);
            // setSuccessMessage(response.data.message);
          } catch (error) {

            console.log("error")
            // setError(error.response.data.error);
          }
        };
    
  return (
    <>
      <Helmet>
        <title> Forget Password | Minimal UI </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Forget Password ?
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter the email address associated with your account and We will email you a link to reset your
                password.
              </Typography>

            <Stack spacing={3}>
        

        <TextField name="email" label="Email address"  onClick={handleEmailChange} />
      </Stack>

            

            <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
                    submit
                </LoadingButton>
            
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
