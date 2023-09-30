import cl from '../../../colors';

export interface TileTheme {
  color: string;
  backgroundColor?: string;
  background?: string;
  textDecoration?: string;
  opacity?: number;
  border?: string;
  backgroundClip?: 'text';
  fontWeight?: string;
  hover?: {
    color?: string;
    backgroundColor?: string;
    opacity?: number;
  };
  cursor?: string;
}

const gradient = `linear-gradient(45deg, ${cl.getHSL(cl.red)}, ${cl.getHSL(
  cl.purple_bright
)}, ${cl.getHSL(cl.blue)})`;

const tileThemes: {
  available: TileTheme;
  past: TileTheme;
  booked: TileTheme;
  bookedByUser: TileTheme;
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
  bookedByUser: {
    color: cl.getHSL(cl.purple_bright),
    fontWeight: '400',
    // border: `2px solid ${cl.getHSL(cl.purple)}`,
    backgroundColor: cl.getHSL(cl.white),

    // textDecoration: 'line-through',
    cursor: 'pointer',
  },
  selectedForBooking: {
    color: cl.getHSL(cl.white),
    backgroundColor: cl.getHSL(cl.black),
    background: cl.getHSLA(cl.black, 0.9),
    opacity: 1,
    hover: {
      opacity: 1,
    },
  },
};

export default tileThemes;
