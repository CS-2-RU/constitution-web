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
                            mute: '2 часа',
                            warn: true,
                        }
                    }
                ]} />
            <Plain content="Кикать во время игры - Администрации запрещено, только после кика человека из игры, либо сам создатель румы может его выгнать." />
            <Plain content="Если хост комнаты выходит, и в течении 5 минут не перезаходит в свой ранее созданный канал, то он больше не является хостом этой комнаты. Хостом комнаты автоматически становится человек который зашёл после создания канала." />
            <Plain content="Наказание может быть смягчено, если у него что-то не работало, и он пытался устранить проблему перезаходом. Либо если у него вылетелел/залагал дискорд" />

        </div>
    )
}

export default Rule4p3;