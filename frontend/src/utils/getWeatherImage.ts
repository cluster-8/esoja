import Image01 from "../assets/weather-images/01.png";
import Image02 from "../assets/weather-images/02.png";
import Image03 from "../assets/weather-images/03.png";
import Image04 from "../assets/weather-images/04.png";
import Image09 from "../assets/weather-images/09.png";
import Image10 from "../assets/weather-images/10.png";
import Image11 from "../assets/weather-images/11.png";
import Image13 from "../assets/weather-images/13.png";
import Image50 from "../assets/weather-images/50.png";

export const getWeatherImage = (icon: string) => {
  icon = icon.replace(/[^0-9]/g, "");
  switch (icon) {
    case "01":
      return Image01;
    case "02":
      return Image02;
    case "03":
      return Image03;
    case "04":
      return Image04;
    case "09":
      return Image09;
    case "10":
      return Image10;
    case "11":
      return Image11;
    case "13":
      return Image13;
    case "50":
      return Image50;
    default:
      return Image01;
  }
};
