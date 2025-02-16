import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#141214")(props),
    },
  }),
};

const components = {
  Drawer: {
    baseStyle: (props: any) => ({
      dialog: {
        bg: mode("white", "#141214")(props),
      },
    }),
  },
};

const customTheme = extendTheme({
  components,
  styles,
});

export default customTheme;
