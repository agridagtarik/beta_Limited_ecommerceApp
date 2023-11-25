import { FunctionComponent } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "../assets/components/Navbar";
import { HomePage } from "../pages/HomePage";
import { store } from "../store/index";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeApp = createTheme({
  palette: {
    background: {
      default: "#F6F9FC",
    },
  },
});

export const App: FunctionComponent = () => (
  <Provider store={store}>
    <ThemeProvider theme={themeApp}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
