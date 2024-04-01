import React from "react";
import Description from "../Templates/Description";
import Plain from "../Templates/Plain";
import BulletPoints from "../Templates/BulletPoints";
import UserChat from "../Templates/UserChat";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule1p2 = () => {
    return(
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
                            nar: true,
                        }
                    },
                    {
                        title: '3',
                        punishment: {
                            mute: '10 минут',
                        }
                    },
                    {
                        title: '4',
                        punishment: {
                            warn: true,
                        }
                    },
                ]} />
            <div className="rule-container-category">
                <Description keyN={`<b>Капс</b>`} valueN=" - написание текста при включенном на клавиатуре режиме Caps lock, то есть ЗАГЛАВНЫМИ БУКВАМИ. Казалось, все понятно, но даже здесь есть свои нюансы." headline={null} />
                <BulletPoints
                    headline="Нарушение за капс не выдается в данных случаях:"
                    content={[
                        "Человек смеется: <b>Пример:</b> <m>АХАХAХАХАХ</m>",
                        "Сообщение состоит из одного слова написанного капсом <b>Пример:</b> <m>МАМА!</m>",
                        "В сообщении менее 70% написано капсом: <b>Пример:</b> <m>Мы-КОМАНДА, наш СТАФ самый дружный и сплоченный</m>"
                    ]}
                />
            </div>
            <div className="rule-container-category">
                <Description keyN={`<b>Флуд</b>`} valueN=" - отправка большого количества однотипных сообщений или сообщений НЕ НЕСУЩИХ СМЫСЛА, в том числе паст" headline={null} />
                <UserChat headline={"Пример:"} content={[
                    ['user-a', 'Участник 1', 'Как дела у вас?', 'description'],
                    ['user-b', 'Участник 2', 'asujdmuasjd', null],
                    ['user-a', 'Участник 1', 'Как дела у вас?', 'description'],
                    ['user-b', 'Участник 2', 'ыаввфафа', 'description'],
                ]} />
                <Plain content={"Помните, что даже обычная игра в слова считается флудом!"} />
            </div>
            <div className="rule-container-category">
                <Description keyN={`<b>Оффтоп</b>`} valueN=" - любое сетевое сообщение, выходящее за рамки заранее установленной темы общения" headline={null} />
                <BulletPoints
                    headline="Важные моменты при выдаче оффтопа в чатах:"
                    content={[
                        "В чатах <c>#ваши-прицелы</c>, <c>#для-команд</c>, <c>#мемы</c> нарушения выдаем без словесного предупреждения",
                        "В чате <c>#поиск-команды</c> все заявки, отправленные не по форме просто удаляются (без выдачи наказаний)",
                        "В чате <c>#общение</c> игроков перенаправляем в нужный им канал без выдачи наказания, исключением являются те участники, которые находятся на сервере давно (от роли <r>«Энергичный»</r>)."
                    ]}
                />
                <UserChat headline={"Пример:"} content={[
                    ['user-a', 'Участник', 'Кто мм?', 'должно удаляться вами'],
                    ['user-b', 'Администратор', '<u>@Участник</u> (вставляется копипаста из чата <c>#команды</c>)', null],
                ]} />
                <Description headline="Использовать эмодзи" valueN="больше 10 - запрещено" />
                <Description headline="Стихи, песни, урывки из новостей" valueN="Запрещено, считается оффтопом" />
            </div>
        </div>
    )
}

export default Rule1p2;