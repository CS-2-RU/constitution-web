import React from "react";
import Description from "../Templates/Description";
import List from "../Templates/List";
import Plain from "../Templates/Plain";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule1p1 = () => {
    return(
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            verbal: true,
                            mute: '10 дней',
                            nar: true,
                            warn: true,
                            timeout: '10 дней',
                            localban: '10 дней'
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
                            warn: true,
                            mute: '1 час',
                        }
                    },
                ]} />
            <Description keyN={`<b>Оскорбление</b>`} valueN=" - умышленное унижение чести и достоинства личности" headline={null} />
            <Description keyN={`<b>Провокация на конфликт</b>`} valueN=" - любая форма колкостей по отношению к пользователям нашего сервера (такие действия должны пресекаться на корню, если вы смогли предотвратить конфликт, наказание смягчается вплоть до нуля)." headline={null} />
            <List content={['Еблан', 'тупой', 'мразь', 'долбаеб', 'хуесос', 'уебан', 'конченый']} />
            <Plain content={"Также в данном пункте важно заметить, что если человека спровоцировали на нарушение данного правила, то наказание либо не выдается либо же выдается в маленькой мере."} />
            <Plain content={"Стоит помнить! Если вы находитесь не на рабочем месте(не в сети, не на тикете), а просто играете в каком-то из каналов и вас начинают оскорблять, то это относиться к пункту <b>1.1</b>."} />
            <Description headline="Оскорбительные названия приватных комнат" valueN="В зависимости от оскорбления выдаете наказание по одному (или нескольким) пунктам - <c>1.1</c>/<c>1.11</c>/<c>3.2</c>" />
            <Description headline="Оскорбительные роли - не нарушает" valueN="Если в ролях написаны никнеймы пользователь или серверные роль с оскорбительным контекстом, то в таком случае вы можете выдать наказание в соответствии с нарушением" />
        </div>
    )
}

export default Rule1p1;