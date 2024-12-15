import React from "react";
import BulletPoints from "../Templates/BulletPoints";
import Description from "../Templates/Description";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule2p1 = () => {
    return (
        <div className="rule-container">
            <Description keyN="<b>Рекламная деятельность</b>" headline={null} valueN=" - Распространение информации об объекте, для привлечения к нему внимания, поддержания или формирования интереса."/>
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            mute: '24 часа',
                            ban: '30 дней (360 дней если реклама дискорд серверов)'
                        }
                    }
                ]} />
            <BulletPoints headline="Пример:" content={[
                "<m>Посетите этот замечательный сайт - “GGDROP”</m>"
            ]} />
            <Description keyN="<b>Предпринимательская деятельность</b>" headline={null}
                         valueN=" - самостоятельная, осуществляемая на свой риск деятельность, направленная на получение прибыли."/>
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            mute: '2 часа',
                            warn: true
                        }
                    }
                ]} />
            <BulletPoints headline="Пример:" content={[
                "<m>Вводите мой промокод HS12SAD на GGDROP , вы получите 20% при пополнении</m>"
            ]} />
            <BulletPoints headline="Если кратко:" content={[
                "<c>Реклама</c> - привлечение интереса",
                "<c>Предпринимательство</c> - получение прибыли"
            ]} />
            <BulletPoints headline="2.1 не применяется в случаях:" content={[
                "Ссылки на локальные сервера",
                "Ссылка была отправлена менее 3х раз"
            ]} />
        </div>
    )
}

export default Rule2p1;