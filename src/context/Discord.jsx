import React, { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import {ids} from "../utils/ids";

const DiscordContext = createContext();

export const DiscordProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [userId, setUserId] = useState(null);
    const [canAccess, setCanAccess] = useState(false);

    useEffect(() => {
        const encryptedUserId = localStorage.getItem('discordUserId');
        const expiry = localStorage.getItem('discordUserExpiry');

        if (encryptedUserId && expiry && new Date().getTime() < parseInt(expiry, 10)) {
            const decryptedUserId = CryptoJS.AES.decrypt(encryptedUserId, 'meow').toString(CryptoJS.enc.Utf8);
            setAuth(true);
            setUserId(decryptedUserId);
            setCanAccess(ids.includes(decryptedUserId));
        } else {
            localStorage.removeItem('discordUserId');
            localStorage.removeItem('discordUserExpiry');
        }
    }, []);

    const saveUserId = (id) => {
        const expiryTime = new Date().getTime() + 5 * 24 * 60 * 60 * 1000;
        const encryptedUserId = CryptoJS.AES.encrypt(id, 'meow').toString();

        localStorage.setItem('discordUserId', encryptedUserId);
        localStorage.setItem('discordUserExpiry', expiryTime.toString());

        setAuth(true);
        setUserId(id);
        setCanAccess(ids.includes(id));
    };

    return (
        <DiscordContext.Provider value={{ auth, userId, canAccess, saveUserId }}>
            {children}
        </DiscordContext.Provider>
    );
};

export const useDiscord = () => useContext(DiscordContext);