import React from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from "react-redux";

const Auth = (props) => (props.user.currentUser.isLoggedIn ? props.children : <Redirect to={'/auth/login'}/>)
const mapStateToProps = ({user}) => ({user});
export default connect(mapStateToProps, {})(Auth);