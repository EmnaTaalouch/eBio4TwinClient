import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="flex-end">
        <TextField name="oldPassword" fullWidth type="password" label="Old Password" />

        <TextField name="newPassword" fullWidth type="password" label="New Password" />

        <TextField name="confirmNewPassword" fullWidth type="password" label="Confirm New Password" />

        <LoadingButton type="submit" variant="contained">
          Save Changes
        </LoadingButton>
      </Stack>
    </Card>
  );
}
