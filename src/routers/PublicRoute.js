import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
       <Route
       component = {(props) => (
           (!isAuthenticated)
           ? <Component {...props}/>
           : <Redirect to="/" />
       )}
       {...rest}
       />
    )
}

PublicRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}