import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme.js";
import GlobalStyles from "./styles/GlobalStyles.js";
import store from "./store";

const AppWithTheme = () => {
  const [theme, setTheme] = React.useState(lightTheme);

  React.useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const currentTheme = store.getState().ui.theme;
      setTheme(currentTheme === "dark" ? darkTheme : lightTheme);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWithTheme />
    </Provider>
  </React.StrictMode>
);
