import React, { useState, useEffect } from 'react';
import LoggedOffNavigation from './LoggedOffNavigation';
import LoggedInNavigation from './LoggedInNavigation';

interface NavigationProps {
    loggedIn: boolean
}

const Navigation = (props: NavigationProps) => {


    return (
        <>
        {
            !props.loggedIn ? 
            <LoggedOffNavigation/>
            :
            <LoggedInNavigation/>
        }
        </>
    );

}

export default Navigation;