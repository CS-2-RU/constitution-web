import React from "react";
import Plain from "../Templates/Plain";
import Description from "../Templates/Description";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule1p6 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            mute: '24 часа',
                            ban: '9999д (твинк) +30 дней (основной)'
                        }
                    }
                ]} />
            <Plain content="Запрещено владеть несколькими аккаунтами на сервере и заходить на сервер с недавно созданного аккаунта." />
            <Plain content="Так же, стоит отметить что при наличии активного твинк аккаунта, то на основной аккаунт увеличивается срок наказания (если на нем таковые имеются) срок наказания от 15 дней." />
            <Description headline="Бан твинка - основного акка" valueN="Увеличение бана основного аккаунта от 15 дней" />
            <Plain content="Важно помнить, что если пользователь просто зашел на сервер с целью обжалования наказания, то в таком случае наказание на основу не увеличивается, а вы просто баните его твинк. Даже если он сыграл пару игр на сервере" />
        </div>
    )
}

export default Rule1p6;