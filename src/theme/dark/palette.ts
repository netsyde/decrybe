import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: colors.blue[500],
    light: colors.indigo[100]
  },
  secondary: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue['A400'],
    light: colors.blue['A400']
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400]
  },
  text: {
    primary: white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    link: colors.blue[200]
  },
  link: colors.blue[800],
  icon: 'rgba(255, 255, 255, 0.7)',
  background: {
    default: '#212121',
    paper: "#333333"
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  navButtonColor: white, //colors.blueGrey[800]
  navbuttonLeafColor: white, //colors.blueGrey[800]
  paginate: black, // colors.blueGrey[50]
  dividerTask: "inherit", // colors.grey[300]
  navIconColor: "#909090", //colors.blueGrey[600]
  message: "#333333", // colors.grey[50]
  application: "#212121", // colors.grey[100]
  disputes: "inherit",
  chat: "inherit",
  navBackground: "inherit",
  backColor: "#212121",
  code: "#333333"
};
