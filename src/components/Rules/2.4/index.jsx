import React from "react";
import Plain from "../Templates/Plain";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule2p4 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            mute: '24 часа',
                            ban: '360 дней'
                        }
                    }
                ]} />
            <Plain content="В этот пункт правил включаются действия направленные на воровство собственной аудитории CS:GO RU, те активный пиар серверов с аналогичной тематикой, как непосредственно на сервере, так и в лс." />
        </div>
    )
}

export default Rule2p4;