import React from "react";
import Plain from "../Templates/Plain";
import BulletPoints from "../Templates/BulletPoints";
import UserChat from "../Templates/UserChat";
import Description from "../Templates/Description";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule1p4 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            localban: '90 дней'
                        }
                    }
                ]} />
            <Plain content="К данному пункту правил относится только те скрипты, которые касаются игры <u>CS2</u> все читы для других игр не караются этим пунктом правил." />
            <Plain content="Также, стоит отметить, что использование сторонних программ, помогающих в модерации сервера караются серьезнее (вплоть до перманентного бана)." />
            <BulletPoints headline="Под отказом от проверки подразумевается:" content={[
                "Игнор в течении 24-ёх часов, если у человека статус 'Не в сети' или 'Неактивен'.",
                "Игнор в течении 20 -ти часов, если у человека статус 'Не беспокоить'. ",
                "Игнор в течении 10-ти часов, если у человека статус 'В сети'.",
                "Прямой отказ от проверки, отказ скачивать программы сервера для проверки."
            ]} />
            <UserChat headline="Примеры отказов:" content={[
                ["user-a", 'Пример 1', 'я не буду проходить проверку пока вы мне не предоставите информацию о том кто на меня кинул жалобу и откат момента за который на меня кинули жалобу.', 'Важно помнить, что администрация не предоставляет подобную информацию пользователям.'],
                ["user-b", 'Пример 2', 'я не буду ничего скачивать, вы мне щас вирусов на комп наскачиваете, я не доверяю вам.', 'Отказ от установки наших приложений для проверки расценивается как отказ от проверки (но стоить знать, что в этой ситуации вы предоставляете возможность скачать программы для проверки самостоятельно)'],
                ["user-c", 'Пример 3', 'Вы списались с человеком, договорились о времени, далее он целенаправленно вам отвечает с слишком длинным промежутком или постоянно переносит время проверки.']
            ]} />
            <Plain content="Также отказом от проверки является случай, когда вы списались с человеком, договорились о времени, далее он целенаправленно вам отвечает с слишком длинным промежутком или постоянно переносит время проверки." />
            <Description headline="Читы на другие игры - Не нарушает 1.4" valueN="Важно помнить, что играть с читами в другие игры не запрещено, но запрещено рекламировать или агитировать других пользователей начать играть с читами, если такое происходит, то это уже будет нарушением пункта правил <c>1.11 14 пункт</c>." />
        </div>
    )
}

export default Rule1p4;