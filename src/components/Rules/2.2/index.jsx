import React from "react";
import Plain from "../Templates/Plain";
import Description from "../Templates/Description";
import BulletPoints from "../Templates/BulletPoints";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule2p2 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            warn: true,
                        }
                    },
                    {
                        title: '2',
                        punishment: {
                            timeout: '1 час',
                        }
                    }
                ]} />
            <Description keyN="<b>Попрошайничество</b>" headline={null}
                         valueN=" - это выпрашивание у посторонних лиц денег или материальных ценностей."/>
            <BulletPoints headline="Примеры попрошайничества:" content={[
                "Парни купите мне пожалуйста Armory Pass",
                "Подкиньте на ремонт гаража",
                "Накиньте ширпа пжпжпж"
            ]} />
            <Plain content="Попрошайничество не распространяется на донатные роли и печеньки." />
        </div>
    )
}

export default Rule2p2;