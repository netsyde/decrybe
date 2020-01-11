import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';
//import '../../assets/light/scss/index.scss';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: colors.indigo[900],
    main: colors.indigo[500],
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
    primary: colors.blueGrey[900],
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  link: colors.blue[800],
  icon: colors.blueGrey[600],
  background: {
    default: '#F4F6F8',
    paper: white
  },
  divider: colors.grey[200],
  navButtonColor: colors.blueGrey[800],
  navbuttonLeafColor: colors.blueGrey[800],
  paginate: colors.blueGrey[50],
  dividerTask: colors.grey[300],
  navIconColor: colors.blueGrey[600],
  message: colors.grey[50],
  application: colors.grey[100],
  disputes: "#fff",
  chat: "#fff",
  navBackground: "#fff",
  backColor: "#F4F6F8",
  code: "#eeeeee"
};
