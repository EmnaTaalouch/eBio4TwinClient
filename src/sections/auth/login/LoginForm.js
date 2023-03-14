/* eslint-disable */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// sharedsharedComponents
import axios from 'axios';
import Iconify from '../../../sharedComponents/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
   const navigate = useNavigate();


  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleClick = async () => {
    console.log(email,password);

    const bodyToSend = {
      email:email,
      password:password
    }

    try {
      const result = await axios.post("http://localhost:3000/user/login",bodyToSend)
    console.log(result.data);
    localStorage.setItem('token',JSON.stringify(result.data.token));
    localStorage.setItem('email',JSON.stringify(result.data.email))
    window.location.reload();
     navigate('/dashboard/app', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={onEmailChange}/>

        <TextField
          name="password"
          label="Password"
          onChange={onPasswordChange}
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
