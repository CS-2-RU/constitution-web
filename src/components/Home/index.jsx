import React from "react";
import './index.css';
import {rules} from "../../utils/rules";
import {Link} from "react-router-dom";

const Home = () => {
    return(
        <div className="home">
            {Object.entries(rules).map(([category, rules]) => (
                <div className="home-category" key={category}>
                    <span className="home-category-label">{category}</span>
                    <div className="home-category-container">
                        {Object.entries(rules).map(([ruleKey, { short_description }]) => (
                            <div className="home-category-element" key={ruleKey}>
                                <div className="home-category-element-text">
                                    <span className="home-category-element-label">{ruleKey}</span>
                                    <span className="home-category-element-name">{short_description}</span>
                                </div>
                                <Link className="home-category-element-link" to={`${ruleKey}`}>Подробнее</Link>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Home;