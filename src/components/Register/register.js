import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// sharedComponents
import Logo from '../../sharedComponents/logo';

import RegistrationForm from './registrationForm';
import RoleForm from './roleForm';

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

// ----------------------------------------------------------------------
export default function Register() {
  const mdUp = useResponsive('up', 'md');
  const [tap, setTap] = useState(0);
  const [role, setRole] = useState('user');

  return (
    <>
      <Helmet>
        <title> Register | eBio </title>
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
              Hi, Welcome to eBio
            </Typography>
            <img src="/assets/illustrations/illustration_register.png" alt="login" />
          </StyledSection>
        )}
        {tap === 0 ? <RoleForm setTap={setTap} setRole={setRole} /> : <RegistrationForm setTap={setTap} role={role} />}
      </StyledRoot>
    </>
  );
}
