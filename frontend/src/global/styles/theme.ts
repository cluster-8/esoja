import fonts from "./fonts";

import esojaLogoDarkImg from "../../assets/images/logo-dark.png";
import esojaLogoLightImg from "../../assets/images/logo-dark.png";

import backgroundDark from "../../assets/images/background-esoja.png";
import backgroundLight from "../../assets/images/background-esoja-light.png";

export default {
  light: {
    colors: {
      primary: "#007A3D",
      text: "#3F3E40",
      text_secondary: "#777777",
      background: "#F6F6F6",
      background_over: "#FFFFFF",
      details: "#BBBBBB",
      attention: "#CC3333",
      yellow: "#FCA600",
      white: "#FFFFFF",
    },
    images: {
      esoja_logo: esojaLogoLightImg,
      background: backgroundLight,
    },
    ...fonts,
  },
  dark: {
    colors: {
      primary: "#00CC66",
      text: "#EBEBEB",
      text_secondary: "#AFAFAF",
      background: "#2D282A",
      background_over: "#3F3E40",
      details: "#606060",
      attention: "#F85149",
      yellow: "#FCA600",
      white: "#FFFFFF",
    },
    images: {
      esoja_logo: esojaLogoDarkImg,
      background: backgroundDark,
    },
    ...fonts,
  },
};
