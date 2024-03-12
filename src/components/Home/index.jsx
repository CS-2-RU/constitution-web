import React from "react";
import './index.css';
import {rules} from "../../utils/rules";
import {useRuleModal} from "../../utils/providers/RuleModalProvider";

const Home = () => {
    const {openModal} = useRuleModal();
    return(
        <div className="home">
            {Object.entries(rules).map(([category, rules]) => (
                <div className="home-category" key={category}>
                    <span className="home-category-label">{category}</span>
                    <div className="home-category-container">
                        {Object.entries(rules).map(([ruleKey, { short_description, element }]) => (
                            <div className="home-category-element" key={ruleKey}>
                                <div className="home-category-element-text">
                                    <span className="home-category-element-label">{ruleKey}</span>
                                    <span className="home-category-element-name">{short_description}</span>
                                </div>
                                <button onClick={() => openModal(element, short_description)} className="home-category-element-link">Подробнее</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Home;