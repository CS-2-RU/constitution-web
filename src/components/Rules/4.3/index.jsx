import React from "react";
import Plain from "../Templates/Plain";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule4p3 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            verbal: true
                        }
                    },
                    {
                        title: '2',
                        punishment: {
                            warn: true
                        }
                    },
                    {
                        title: '3',
                        punishment: {
                            timeout: '2 часа'
                        }
                    }
                ]} />
            <Plain content="Кикать/мутить/банить во время игры Администрации запрещено. Однако, хост румы может выгнать пользователя во время игры через команду /выгнать в канале <c>#для-команд</c>, либо через кнопку “Выгнать игрока” в канале <c>#lfg-поиск-игроков</c>." />
            <Plain content="Если хост комнаты выходит, и в течении 5 минут не перезаходит в свой ранее созданный канал, то он больше не является хостом этой комнаты. Лидером комнаты автоматически становится человек, который зашёл после создания канала. Для проверки нужно посмотреть историю комнату в канале <c>#logs</c>" />
        </div>
    )
}

export default Rule4p3;