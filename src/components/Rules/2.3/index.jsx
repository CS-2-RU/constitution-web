import React from "react";
import Plain from "../Templates/Plain";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule2p3 = () => {
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
                            mute: '24 часа',
                        }
                    },
                    {
                        title: '3',
                        punishment: {
                            mute: '24 часа',
                            ban: '30 дней',
                        }
                    },
                ]} />
            <Plain content="В это правило включаются игры на скины, трейды, раздачи и т.п." />
            <Plain content="Однако существуют ситуации, в которых нужно проверять отдельные ссылки, которые скидывает пользователь. Вполне вероятно эти ссылки могут оказаться фишинговыми, тогда это будет правилом <c>1.5</c>." />
        </div>
    )
}

export default Rule2p3;