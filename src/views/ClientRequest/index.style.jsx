import sweetAlertStyle from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.jsx";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.jsx";
import common_styles from 'assets/jss/common';

const styles = {
    ...common_styles,
    cardIconTitle: {
        ...cardTitle,
        marginTop: "15px",
        marginBottom: "0px"
    },
    ...sweetAlertStyle,
};
export default styles;