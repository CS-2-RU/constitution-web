import React from "react";
import Plain from "../Templates/Plain";
import PunishmentTable from "../Templates/PunishmentTable";
import Description from "../Templates/Description";
import BulletPoints from "../Templates/BulletPoints";

const Rule2p3 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            warn: true,
                        }
                    },
                    {
                        title: '2',
                        punishment: {
                            timeout: '24 часа',
                        }
                    },
                    {
                        title: '3',
                        punishment: {
                            timeout: '24 часа',
                            localban: '30 дней',
                        }
                    },
                ]} />
            <Plain content="Все 3 термина подразумевают только Steam." />
            <Description keyN="<b>Покупка</b>" headline={null}
                         valueN=" - процесс, который бизнес или организация использует для приобретения товаров или услуг для достижения своих целей."/>
            <Description keyN="<b>Продажа</b>" headline={null}
                         valueN=" - термин, охватывающий широкий спектр коммерческой деятельности, включающий любые операции, направленные на получение прибыли."/>
            <Description keyN="<b>Обмен</b>" headline={null}
                         valueN=" - процесс передачи объектов между двумя сторонами, при котором одна сторона получает объект, отдавая другой стороне что-то взамен."/>
            <BulletPoints headline="Примеры:" content={[
                "<m>Продаю игру GOT OF WAR, кому интересно писать в лс.</m>",
                "<m>Обменяю BMW///M5 F90 на Porsche Cayenne.</m>",
                "<m>Куплю Штык-нож M9 | Автотроника, писать в лс.</m>"
            ]} />
            <Plain content="Существуют ситуации, в которых нужно проверять отдельные ссылки, которые скидывает пользователь. Более вероятно эти ссылки могут оказаться фишинговыми, тогда это будет нарушаться пунктом правила 1.5." />

        </div>
    )
}

export default Rule2p3;