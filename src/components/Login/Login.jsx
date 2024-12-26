import React, {useEffect} from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import {useDiscord} from "../../context/Discord";

const Login = () => {
    const { saveUserId, auth } = useDiscord();
    const navigate = useNavigate();

    const handleLogin = () => {
        const clientId = '1318964293714182254';
        const redirectUri = encodeURIComponent('http://localhost:3000/login');
        const scope = 'identify';
        const responseType = 'token';

        window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    };

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get('access_token');

            if (accessToken) {
                // Fetch user info
                fetch('https://discord.com/api/users/@me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.id) {
                            saveUserId(data.id);
                            navigate('/');
                        }
                    });
            }
        }
    }, [saveUserId]);

    useEffect(() => {
        console.log(auth);
        if (auth) {
            navigate("/");
        }
    }, [auth]);

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={handleLogin}>Войти с помощью дискорда</button>
        </div>
    );

}

export default Login;
