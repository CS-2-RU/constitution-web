import React from "react";
import Plain from "../Templates/Plain";
import Description from "../Templates/Description";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule4p2 = () => {
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
                            mute: '4 часа',
                            warn: true,
                        }
                    }
                ]} />
            <Description keyN="<b>Помехи в голосовых каналах</b>" valueN=" - шумы, крики, стоны от участника" headline={null} />
            <Plain content="Если пользователь делал это неосознанно, или не знал, как устранить проблему - наказание может быть смягчено или снято." />
        </div>
    )
}

export default Rule4p2;