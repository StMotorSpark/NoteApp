import React, { useContext } from 'react';

import { GoogleLogin } from 'react-google-login';
import { LoginContext } from '../hooks/loginHook';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
    '392009706522-oa8u9clf1cm1pavfr0sno9s9gqq20v85.apps.googleusercontent.com';

function Login() {
    const loginCont = useContext(LoginContext);

    if(loginCont.loginState !== null) {
        return null;
    }

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        // refreshTokenSetup(res);
        loginCont.loginSuccess(res.profileObj);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    );
}

export default Login;