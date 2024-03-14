import React from "react";
import Description from "../Templates/Description";
import Plain from "../Templates/Plain";

const Rule4p1 = () => {
    return (
        <div className="rule-container">
            <Description headline={null} valueN=" - Soundpad и программы на тему трансляции звуков при общении" keyN="<b>Трансляция громких звуков</b>"/>
            <Plain content="Важно заметить, если музыка транслируется не с компьютера участника, а, например, играет у него с помощью колонки на заднем фоне, то нарушение рассматривается по пункту <c>4.1</c>" />
        </div>
    )
}

export default Rule4p1;