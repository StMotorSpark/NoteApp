import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { LoginContext } from '../hooks/loginHook';

const clientId = '392009706522-oa8u9clf1cm1pavfr0sno9s9gqq20v85.apps.googleusercontent.com';

function Logout() {
    const loginCont = useContext(LoginContext);

    const onSuccess = () => {
        // console.log('Logout made successfully');
        // alert('Logout made successfully ✌');
        loginCont.logoutSuccess();
    };

    if(loginCont.loginState === null) {
        return null;
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
}

export default Logout;