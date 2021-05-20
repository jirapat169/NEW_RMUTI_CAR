import "../styles/globals.scss";
import { ThemeProvider } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import useLocalStorage from "../components/useLocalStorage";
import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import Guard from "../guards/guard";
import axios from "axios";

const env = require(`../environments/${process.env.mode}`).default;
const ThemeConfig = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

const initialState = { tabSidenav: true };

function MyApp({ Component, pageProps }) {
  const [userLogin, patchUserLogin] = useLocalStorage("userLogin", {});
  const [state, patchState] = useState(initialState);

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // axios
    //   .get(`https://api.rmuti.ac.th/api/v3/car_req/me`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Bearer: "demo14507acc",
    //     },
    //   })
    //   .then((val) => {
    //     console.log(val);
    //   });
  }, []);

  return (
    <ThemeProvider theme={ThemeConfig}>
      <Guard
        {...pageProps}
        {...state}
        patchState={(e) => {
          patchState({ ...state, ...e });
        }}
        userLogin={Object.keys(userLogin).length > 0 ? userLogin : null}
        isLogin={Object.keys(userLogin).length > 0 ? true : false}
        patchUserLogin={(e) => {
          patchUserLogin(e);
        }}
        env={env}
      >
        <Component
          {...pageProps}
          {...state}
          patchState={(e) => {
            patchState({ ...state, ...e });
          }}
          userLogin={Object.keys(userLogin).length > 0 ? userLogin : null}
          isLogin={Object.keys(userLogin).length > 0 ? true : false}
          patchUserLogin={(e) => {
            patchUserLogin(e);
          }}
          env={env}
        />
      </Guard>
    </ThemeProvider>
  );
}

export default MyApp;
