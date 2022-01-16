import { extendTheme } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";

// Configs
import { ColorPallete } from "./color";

const OverrideTheme = {
  ...ColorPallete,
  styles: {
    ...chakraTheme.styles,
    global: {
      ...chakraTheme.styles.global,
      body: {
        color: "#1d3557",
        bg: "#f8fafc",
      },
    },
  },
};

const PRideTheme = extendTheme(OverrideTheme);
export default PRideTheme;
