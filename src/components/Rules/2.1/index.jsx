import React from "react";
import Plain from "../Templates/Plain";
import BulletPoints from "../Templates/BulletPoints";
import Description from "../Templates/Description";

const Rule2p1 = () => {
    return (
        <div className="rule-container">
            <Description keyN="<b>Рекламная деятельность</b>" headline={null} valueN=" - Распространение информации об объекте, для привлечения к нему внимания, поддержания или формирования интереса."/>
            <BulletPoints headline="Пример:" content={[
                "<m>Посетите этот замечательный сайт - “GGDROP”</m>"
            ]} />
            <Description keyN="<b>Предпринимательская деятельность</b>" headline={null}
                         valueN=" - самостоятельная, осуществляемая на свой риск деятельность, направленная на получение прибыли."/>
            <BulletPoints headline="Пример:" content={[
                "<m>Вводите мой промокод HS12SAD на GGDROP , вы получите 20% при пополнении</m>"
            ]} />
            <BulletPoints headline="Если кратко:" content={[
                "<c>Реклама</c> - привлечение интереса",
                "<c>Предпринимательство</c> - получение прибыли"
            ]} />
        </div>
    )
}

export default Rule2p1;