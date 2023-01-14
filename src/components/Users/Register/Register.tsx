import { Button, TextField, Alert, Stack, Snackbar } from "@mui/material/";
import { validationSchemaRegister } from "../../../validationSchema";
import { useFormik } from "formik";
import { User } from "../../../types/user";
import UserDataService from "../../../services/UserAuthService";
import { useState } from "react";
export const Register = () => {
  const [openError, setOpenError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  type UserRgister = Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'| 'searches' | 'items' >
  const formik = useFormik({
    initialValues: {
      userName: "",
      firstName:"",
      lastName:"",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema: validationSchemaRegister,
    onSubmit: async (values, { resetForm }) => {
      const user: UserRgister = {
        userName: values.userName,
        firstName:values.firstName,
        lastName:values.lastName,
        email: values.email,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      };

      await UserDataService.Register(user)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
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
          userName: "",
          firstName:"",
          lastName:"",
          email: "",
          password: "",
          passwordConfirm: "",
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
        <h1>Register</h1>
        <Stack spacing={2} sx={{ maxWidth: 600 }}>
          <Snackbar
            open={openError}
            autoHideDuration={3000}
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
            autoHideDuration={3000}
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
            id="userName"
            name="userName"
            label="Username"
            type="text"
            margin="normal"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && formik.errors.userName}
          />
           <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="Firstname"
            type="text"
            margin="normal"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
            <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Lastname"
            type="text"
            margin="normal"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
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
          <TextField
            fullWidth
            margin="normal"
            id="passwordConfirm"
            name="passwordConfirm"
            label="Confirm Password"
            type="password"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            error={
              formik.touched.password && Boolean(formik.errors.passwordConfirm)
            }
            helperText={
              formik.touched.password && formik.errors.passwordConfirm
            }
            autoComplete="off"
          />
          <Stack spacing={2} sx={{ maxWidth: 400, m:"auto" }}>
            <Button color="primary" variant="contained" fullWidth type="submit" >
              Register
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
};
