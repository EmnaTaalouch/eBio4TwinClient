import * as Yup from 'yup';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Box, Grid, Card, Stack, Typography, TextField, FormHelperText, Switch } from '@mui/material';
import { DatePicker, LoadingButton } from '@mui/lab';
import { fData } from '../../utils/formatNumber';
import UploadAvatar from '../upload/uploadAvatar';
import PointsCard from './PointsCard';

// components

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const user = {};

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    phoneNumber: user?.phoneNumber || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    about: user?.about || '',
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    /* resolver: yupResolver(UpdateUserSchema), */
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
          <div>
            <UploadAvatar
              // error={checkError}
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              // file={field.value}
            />

            <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)}
              </Typography>
            </FormHelperText>
          </div>

          <Switch
            name="isPublic"
            labelPlacement="start"
            label="Public Profile"
            sx={{ mt: 5 }}
            // checked={field.value}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: 'grid',
              rowGap: 3,
              columnGap: 2,
              gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
            }}
          >
            <TextField name="firstName" label="first Name" />
            <TextField name="lastName" label="last Name" />
            <TextField name="email" label="email adress" />
            <TextField name="cin" label="cin" />
            <TextField name="phoneNumber" label="Phone Number" />
            <TextField name="address" label="Address" />
            <TextField name="location" label="location" />

            <TextField name="dateOfBirth" type="date" fullWidth />
          </Box>

          <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
            <PointsCard total={714000} color="success" icon={'octicon:trophy-24'} />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Save Changes
            </LoadingButton>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
const countries = [{ code: 'tn', label: 'Tunisia' }];
