import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm, Controller } from "react-hook-form";
import useLocalStorage from "../../components/useLocalStorage";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const [userLogin, patchUserLogin] = useLocalStorage("userLogin", {});

  const onSubmit = (data) => {
    patchUserLogin({
      username: "user",
      prename: "นาย",
      firstname: "จิรพัฒน์",
      lastname: "สุคนธพงศ์",
      role: "user",
    });

    window.location.replace("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field, onChange }) => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="ชื่อผู้ใช้งาน"
                name="email"
                autoComplete="email"
                {...field}
                onChange={onChange}
                autoFocus
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field, onChange }) => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="รหัสผ่าน"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
                {...field}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            เข้าสู่ระบบ
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                ลืมรหัสผ่าน
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"สร้างบัญชีผู้ใช้งาน"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
