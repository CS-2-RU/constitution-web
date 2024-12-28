import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../Home";
import RuleRenderer from "../RuleRenderer";
import Login from "../Login/Login";
import {useDiscord} from "../../context/Discord";
import NoAccess from "../NoAccess/NoAccess";

const Router = () => {
    const { auth, canAccess } = useDiscord();

    return (
        <Routes>
            {!auth && <Route path="/login" element={<Login />} />}
            {auth ? (
                <>
                    <Route path="/" element={canAccess ? <Home /> : <NoAccess />} />
                    <Route path="/rule/:ruleId" element={canAccess ? <RuleRenderer /> : <NoAccess />} />
                    <Route path="/login" element={<Navigate to="/" replace />} />
                </>
            ) : (
                <Route path="*" element={<Navigate to="/login" replace />} />
            )}
        </Routes>
    );
    // return (
    //     <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/rule/:ruleId" element={<RuleRenderer />} />
    //     </Routes>
    // );
};

export default Router;
