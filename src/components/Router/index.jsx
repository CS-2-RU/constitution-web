import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../Home";
import RuleRenderer from "../RuleRenderer";

const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rule/:ruleId" element={<RuleRenderer />} /> // Dynamic route for rules
        </Routes>
    )
}
export default Router;