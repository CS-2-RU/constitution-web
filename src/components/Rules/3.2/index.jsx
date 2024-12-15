import React from "react";
import Plain from "../Templates/Plain";
import BulletPoints from "../Templates/BulletPoints";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule3p2 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            nar: true
                        }
                    },
                    {
                        title: '2',
                        punishment: {
                            mute: '2 часа',
                            warn: true,
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
            <Plain content="При выдаче данного пункта правил, вы должны понимать, что одним из главных моментов, который вы должны сделать - предупредить участника, который вас начинает оскорблять, о существование такого правила как <c>3.2</c>" />
            <BulletPoints headline="Один из примеров, что вы можете сказать:" content={[
                "<m>Попрошу вас уважительнее обращаться со мной, так как я здесь в первую очередь для того, чтобы помочь вам</m>"
            ]} />
            <Plain content="Если участник продолжит оскорблять вас, вы выдаете ему наказание"/>
            <Plain content="Оскорбление администрации, после бана - Увеличение бана от 7 до 30 дней" />
            <Plain content="Не забываем! Если вы находитесь не на рабочем месте (не в сети, не на тикете), а просто играете в каком-то из каналов и вас начинают оскорблять, то это относиться к пункту <c>1.1</c>. Но, если к вам обращаются именно как к представителю администрации, то наказание будет по пункту <c>3.2</c>."/>
        </div>
    )
}

export default Rule3p2;