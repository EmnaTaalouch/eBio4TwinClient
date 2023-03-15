import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// sharedsharedComponents
import Iconify from '../../../sharedComponents/iconify';



// ----------------------------------------------------------------------

export default function ForgetForm() {

  const [email, setEmail] = useState('');  
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });

  const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/forget-password', { email })
          .then((response) => {
            console.log(response.data);
            // show a success message to the user
          })
          .catch((error) => {
            console.log(error.response.data);
            // show an error message to the user
          });

  };

  return (
    <>
      <Stack spacing={3}>
        {/* <TextField name="email" label="Email address" /> */}

        <TextField
          name="email"
          label="email address"
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

      

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}

}

