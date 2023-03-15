import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Stack, IconButton, InputAdornment, TextField , Container, Typography, Divider} from '@mui/material';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// @mui

import { LoadingButton } from '@mui/lab';

import { PassApi } from '../actions/userAction';
import Iconify from '../sharedComponents/iconify';

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

export default function ResetPassPage() {

    const [showPassword, setShowPassword] = useState(false);
  const mdUp = useResponsive('up', 'md');

  const [newPass, setPassword] = useState('');  

  const navigate = useNavigate();

  

const handleClick = () => {
    navigate('/dashboard', { replace: true });}

   
const handlePasswordChange = (event) => {
          setPassword(event.target.value);
        };
      
const handleSubmit = async (event) => {
          event.preventDefault();
          try {
            const response = await PassApi.resetPassword({newPass});
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
        <title> Login | Minimal UI </title>
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
              New Password
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                Please enter your new password
              </Typography>

            <Stack spacing={3}>
        

            <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
