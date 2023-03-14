import { Container, Grid, Link, Stack, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RoleCard from '../../sharedComponents/roleCard';

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));
export default function RoleForm({ setTap, setRole }) {
  const goTo = useNavigate();
  return (
    <>
      <Container maxWidth="xl">
        <StyledContent>
          <Typography variant="h4" gutterBottom>
            Sign up to eBio
          </Typography>

          <Typography variant="body2" sx={{ mb: 5 }}>
            You already have an account? {''}
            <Link variant="subtitle2">Get started</Link>
          </Typography>
          <Container maxWidth="xl" style={{ width: '970px', position: 'relative', right: '250px' }}>
            <Grid container spacing={3} direction="row" justifyContent="space-between" alignItems="center">
              <Grid item xs={4}>
                <RoleCard
                  title="Farmer"
                  icon={'/assets/illustrations/undraw_blooming_re_2kc4.svg'}
                  onClick={() => {
                    setTap(1);
                    setRole('farmer');
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <RoleCard
                  title="Delivrer"
                  icon={'/assets/illustrations/undraw_on_the_way_re_swjt.svg'}
                  onClick={() => {
                    setTap(1);
                    setRole('deliverer');
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <RoleCard
                  title="User"
                  icon={'/assets/illustrations/undraw_mobile_user_re_xta4.svg'}
                  onClick={() => {
                    setTap(1);
                    setRole('user');
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </StyledContent>
      </Container>
    </>
  );
}
