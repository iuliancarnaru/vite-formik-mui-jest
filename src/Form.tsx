import { useFormik } from 'formik';
import * as yup from 'yup';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const MaterialUIForm = () => {
  const { handleSubmit, values, handleChange, touched, errors, isSubmitting } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema,
      onSubmit: (values, { setSubmitting }) => {
        console.log('🔴 values --->', values);

        setTimeout(() => {
          setSubmitting(false);
        }, 3000);
      },
    });

  return (
    <div style={{ maxWidth: '300px', padding: '20px' }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="standard"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="standard"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />
        <LoadingButton
          type="submit"
          endIcon={<SendIcon />}
          loading={isSubmitting}
          loadingPosition="end"
          variant="contained"
        >
          Send
        </LoadingButton>
      </form>
    </div>
  );
};
