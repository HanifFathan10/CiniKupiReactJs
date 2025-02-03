import "@fontsource/poppins";
import "@fontsource-variable/cabin";
import "@fontsource-variable/raleway";
import "@fontsource/poppins";
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    poppins: `'Poppins', sans-serif`,
    raleway: `'Raleway', sans-serif`,
    cabin: `'Cabin Variable', sans-serif`,
  },
});

export default theme;
