import { createBox, createText } from "@shopify/restyle";
import hexToRgba from "hex-to-rgba";

export const colors = {
  mainAppColor: hexToRgba("#121220", 1),
  purleLight: hexToRgba("#26243F", 1),
  white: hexToRgba("#ffffff", 1),
};

const theme = {
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
      color: "white",
    },
    subHeader: {
      fontWeight: "normal",
      fontSize: 20,
      color: "white",
    },
  },
  colors: {
    mainAppColor: colors.mainAppColor,
    purpleLight: colors.purleLight,
    white: "white",
  },
  spacing: {
    s: 10,
    m: 30,
    l: 50,
  },
  breakpoints: {},
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
};

export type Theme = typeof theme;
export default theme;

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
