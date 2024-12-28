import React from "react";
import BulletPoints from "../Templates/BulletPoints";
import Description from "../Templates/Description";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule2p1 = () => {
    return (
        <div className="rule-container">
            <Description keyN="<b>Реклама</b>" headline={null} valueN=" - это распространение информации об объекте, для привлечения к нему внимания, поддержания или формирования интереса."/>
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            localban: '30 дней (360 дней если реклама дискорд серверов)'
                        }
                    }
                ]} />
            <BulletPoints headline="Примеры:" content={[
                "<m>Заходи давай, мы ждём <c>https://discord.gg/youstay</c></m>",
                "<m>На этом сайте вы можете купить пиздатые скины по низким ценам CS.MONEY.</m>",
            ]} />
            <Description keyN="<b>Предпринимательская деятельность</b>" headline={null}
                         valueN=" - это самостоятельная, осуществляемая на свой риск деятельность, направленная на получение прибыли от других пользователей."/>
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
            <BulletPoints headline="Примеры:" content={[
                "<m>Заходите на сайт CSFAIL и введите мой промокод на пополнение баланса. Промокод: PROMO11.</m>",
                "<m>Раздача новых зимних gift кард на разную сумму. Ее можно использовать только на торговой площадке и на игры. Вот сам гифт: <c>steamcommunity.com/ref/10472</c>.</m>"
            ]} />
            <BulletPoints headline="Простыми словами:" content={[
                "<c>Реклама</c> - это привлечение интереса",
                "<c>Предпринимательство</c> - это получение прибыли"
            ]} />
            <BulletPoints headline="2.1 не применяется в случаях:" content={[
                "Ссылки на локальные сервера",
                "Ссылка была отправлена менее 3х раз"
            ]} />
            <Description keyN="<b>Что такое локальный сервер?</b>" headline={null}
                         valueN=" - это частный или открытый сервер, предназначенный для коллективного общения между разними пользователями."/>
        </div>
    )
}

export default Rule2p1;