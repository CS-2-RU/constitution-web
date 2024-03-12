import React, { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useRuleModal} from "../../utils/providers/RuleModalProvider";
import {rules} from "../../utils/rules";
import Home from "../Home";

const RuleRenderer = () => {
    const { ruleId } = useParams();
    const { openModal, closeModal, ruleModalOpen } = useRuleModal();
    const navigate = useNavigate();

    useEffect(() => {
        let found = false;

        // Iterate over the categories and then the rules to find a match
        for (const categoryKey in rules) {
            if (rules.hasOwnProperty(categoryKey)) {
                const category = rules[categoryKey];
                if (category.hasOwnProperty(ruleId)) {
                    const rule = category[ruleId];
                    openModal(rule.element, rule.short_description);
                    found = true;
                    break;
                }
            }
        }

        if (!found) {
            navigate("/");
        }
        return () => {
            if (ruleModalOpen) {
                closeModal();
            }
        };
    }, [ruleId, navigate, openModal]);

    return <Home />;
};

export default RuleRenderer;
