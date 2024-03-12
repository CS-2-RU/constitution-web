import React, {createContext, useContext, useState} from "react";
import './index.css'
import './rules.css'
import {useNavigate} from "react-router-dom";
const RuleModalContext = createContext();

export const RuleModalProvider = ({children}) => {
    const [ruleModalOpen, setRuleModalOpen] = useState(false);
    const [ruleModalComponent, setRuleModalComponent] = useState(null);
    const [ruleModalName, setRuleModalName] = useState("");
    const navigate = useNavigate(); // Make sure you're in a component or hook that supports hooks

    const openModal = (Component, name) => {
        if (Component) {
            setRuleModalComponent(() => Component); // Store the component for later rendering
            setRuleModalName(name);
            setRuleModalOpen(true);
        }
    };
    const closeModal = () => {
        setRuleModalOpen(false);
        navigate("/"); // Redirect to home after closing the modal
    }
    return(
        <RuleModalContext.Provider value={{ruleModalOpen, openModal, closeModal}}>
            {children}
            <div className={`rule-modal-container ${ruleModalOpen ? "open" : "close"}`}>
                <div className="rule-modal">
                    <div className="rule-modal-top">
                        <span>{ruleModalName}</span>
                        <button onClick={closeModal}>
                            <i className="icon close"></i>
                        </button>
                    </div>
                    <div className="rule-modal-content">
                        {ruleModalComponent ? React.createElement(ruleModalComponent) : null}
                    </div>
                </div>
            </div>
        </RuleModalContext.Provider>
    )
}

export const useRuleModal = () => useContext(RuleModalContext);