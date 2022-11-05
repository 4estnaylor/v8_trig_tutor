interface color {
  hue: number;
  saturation: number;
  lightness: number;
}

const getHSL = (color: color) => {
  const string = `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`;
  return string;
};

const getHSLA = (color: color, a: number) => {
  const string = `hsla(${color.hue} ${color.saturation}% ${color.lightness}% / ${a})`;
  return string;
};
// export const turqouise: color = { hue: 174, saturation: 100, lightness: 50 };
// const orange: color = { hue: 12, saturation: 88, lightness: 56 };
// const beige: color = { hue: 354, saturation: 22, lightness: 91 };
// const black: color = { hue: 354, saturation: 7, lightness: 17 };
// const purple: color = { hue: 290, saturation: 100, lightness: 33 };

const black = { hue: 190, saturation: 30, lightness: 10 };
const white = { hue: 190, saturation: 30, lightness: 99 };
const gray_light = { hue: 190, saturation: 15, lightness: 90 };
const gray_mid = { hue: 190, saturation: 15, lightness: 45 };
const gray_dark = { hue: 190, saturation: 15, lightness: 30 };
const red_light = { hue: 340, saturation: 100, lightness: 80 };
const red = { hue: 340, saturation: 90, lightness: 50 };
const red_dark = { hue: 340, saturation: 100, lightness: 30 };
const blue_light = { hue: 190, saturation: 100, lightness: 85 };
const blue = { hue: 190, saturation: 100, lightness: 40 };
const blue_dark = { hue: 190, saturation: 100, lightness: 30 };
const purple = { hue: 225, saturation: 72, lightness: 60 };
// const purple = { hue: 151, saturation: 68, lightness: 15 };
// 151, 68%, 15%
const purple_bright = { hue: 225, saturation: 92, lightness: 60 };
const yellow = { hue: 32, saturation: 89, lightness: 50 };
const green = { hue: 164, saturation: 50, lightness: 50 };

const cl = {
  getHSL,
  getHSLA,
  black,
  white,
  gray_light,
  gray_mid,
  gray_dark,
  red,
  red_light,
  red_dark,
  blue,
  blue_light,
  blue_dark,
  purple,
  purple_bright,
  yellow,
};

export default cl;
