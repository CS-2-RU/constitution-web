import React from "react";
import Plain from "../Templates/Plain";
import PunishmentTable from "../Templates/PunishmentTable";
import BulletPoints from "../Templates/BulletPoints";
import Description from "../Templates/Description";

const Rule2p4 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            localban: '365 дней'
                        }
                    }
                ]} />
            <Description keyN="<b>Переманивание участников сервера</b>" headline={null}
                         valueN=" - это действия направленные на воровство собственной целевой аудитории CS2 RU, то есть активное продвижение сервера с аналогичной тематикой нашего сервера."/>
            <BulletPoints headline="Пример:" content={[
                "<m>Заходите на сервер LFG Clan | FACEIT | CIS | CS2, наш сервер лучший по поиску игроков!</m>"
            ]} />
        </div>
    )
}

export default Rule2p4;