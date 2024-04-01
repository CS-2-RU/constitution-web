import React from "react";
import Plain from "../Templates/Plain";
import BulletPoints from "../Templates/BulletPoints";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule1p7 = () => {
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
            <Plain content="Под данным пунктом подразумевается: если человек понимает, что ему будет выдано наказание и целенаправленно выходит с сервера, тем самым обходя возможность получения наказания и позже заходит, то данному пользователю выдаётся наказание по пункту <c>1.7</c>." />
            <BulletPoints headline="Пример:" content={[
                "Пользователь оскорбляет родных при администраторе, и администратор говорит, что пользователь получит наказание. В этот момент пользователь выходит с сервера и перезаходит на него через час, тем самым пользователь не получает наказание. Когда он возвращается на сервер и вы его видите, то выдаёте наказание по данному пункту правил."
            ]} />
        </div>
    )
}

export default Rule1p7;