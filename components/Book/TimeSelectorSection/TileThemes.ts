import cl from '../../../colors';

export interface TileTheme {
  color: string;
  backgroundColor: string;
  textDecoration?: string;
  opacity?: number;
  hover?: {
    color?: string;
    backgroundColor?: string;
    opacity?: number;
  };
  cursor?: string;
}

const tileThemes: {
  available: TileTheme;
  past: TileTheme;
  booked: TileTheme;
  selectedForBooking: TileTheme;
} = {
  available: {
    color: cl.getHSL(cl.gray_dark),
    backgroundColor: 'transparent',
    hover: {
      backgroundColor: cl.getHSL(cl.black),
      color: cl.getHSL(cl.white),
    },
  },
  past: {
    color: cl.getHSL(cl.gray_dark),
    backgroundColor: cl.getHSL(cl.white),
    opacity: 0.2,
    cursor: 'auto',
    hover: {
      opacity: 0.2,
    },
  },
  booked: {
    color: cl.getHSL(cl.gray_light),
    backgroundColor: cl.getHSL(cl.white),
    // textDecoration: 'line-through',
    cursor: 'auto',
  },
  selectedForBooking: {
    color: cl.getHSL(cl.white),
    backgroundColor: cl.getHSL(cl.purple),
    opacity: 1,
    hover: {
      opacity: 1,
    },
  },
};

export default tileThemes;
