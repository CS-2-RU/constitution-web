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
                            nar: true,
                        }
                    },
                    {
                        title: '2',
                        punishment: {
                            mute: '1 час',
                        }
                    },
                    {
                        title: '3',
                        punishment: {
                            warn: true,
                        }
                    },
                ]} />
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