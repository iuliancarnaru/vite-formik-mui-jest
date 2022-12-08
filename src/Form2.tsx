import { Form, Formik, FormikProps } from 'formik';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const schema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface MyFormValues {
  email: string;
  password: string;
}

interface MaterialUIForm2Props {
  onSubmit: (values: MyFormValues) => void;
}

export const MaterialUIForm2 = ({ onSubmit }: MaterialUIForm2Props) => {
  const initialValues: MyFormValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async ({ email, password }: MyFormValues) => {
    await sleep(500);
    onSubmit({ email, password });
  };

  return (
    <div style={{ maxWidth: '300px', padding: '20px' }}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          handleSubmit(values);

          setTimeout(() => {
            resetForm();
            setSubmitting(false);
          }, 2000);
        }}
        validateOnMount
      >
        {({
          values,
          handleChange,
          touched,
          errors,
          isSubmitting,
          isValid,
        }: FormikProps<MyFormValues>) => (
          <Form>
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
            <Button
              variant="contained"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              Send
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
