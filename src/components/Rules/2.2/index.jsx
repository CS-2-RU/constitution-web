import React from "react";
import Plain from "../Templates/Plain";
import Description from "../Templates/Description";
import BulletPoints from "../Templates/BulletPoints";

const Rule2p2 = () => {
    return (
        <div className="rule-container">
            <Description keyN="<b>Попрошайничество</b>" headline={null}
                         valueN=" - выпрашивание у посторонних лиц денег или материальных ценностей."/>
            <BulletPoints headline="Примеры попрошайничества:" content={[
                "Дайте акк погонять",
                "Скиньте рубль на карту",
                "Накиньте ширпа пжпжпж"
            ]} />
            <Plain content="Важно понимать, что попрошайничество не распространяется на донатные роли, печеньки." />
        </div>
    )
}

export default Rule2p2;