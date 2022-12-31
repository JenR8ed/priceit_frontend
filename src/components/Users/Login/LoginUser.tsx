import { Button, TextField, Alert, Stack, Snackbar } from "@mui/material/";
import { validationSchemaLogin } from "../../../validationSchema";
import { useFormik } from "formik";
import { User } from "../../../types/user";
import UserAuthService from "../../../services/UserAuthService";
import { useState } from "react";
import { useToken } from '../../../auth/useToken'
import {useCookies} from 'react-cookie'

export const LoginUser = () => {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useToken();
  const [cookie, setCookie] = useCookies(['access_token'])
  type UserLogin = Omit<User, 'id' | 'name' | 'passwordConfirm' | 'role' | 'createdAt' | 'updatedAt' >
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemaLogin,
    onSubmit: async (values, { resetForm }) => {
      const user: UserLogin = {
        email: values.email,
        password: values.password,
      };

      await UserAuthService.LogIn(user)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const token:string = response.data.access_token
            setToken(token)
            setSuccessMessage(response.data.status);
            setOpenSuccess(true);
          }
        })
        .catch(function (error) {
          if (error) {
            setErrorMessage(error.response.data.message);
            setOpenError(true);
          }
        });
      resetForm({
        values: {
          email: "",
          password: "",
        },
      });
    },
  });
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenError(false);
  };
  const handleCloseSuccess = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  return (
    <>
      <div className="container_signup">
        <h1>Log In</h1>
        <Stack spacing={2} sx={{ maxWidth: 600 }}>
          <Snackbar
            open={openError}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleClose}
            sx={{ width: "100%" }}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {errorMessage}
            </Alert>
          </Snackbar>
          <Snackbar
            open={openSuccess}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleCloseSuccess}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              {successMessage}
            </Alert>
          </Snackbar>
        </Stack>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete="off"
          />
          <Stack spacing={2} sx={{ maxWidth: 400, m:"auto" }}>
            <Button color="info" variant="contained" fullWidth type="submit">
              Log In
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
};
