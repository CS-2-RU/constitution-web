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
                            warn: true
                        }
                    },
                    {
                        title: '2',
                        punishment: {
                            timeout: '4 часа'
                        }
                    }
                ]} />
            <Description keyN="<b>Помехи в голосовых каналах</b>" valueN=" - шумы, крики, стоны, песни и тд от участника" headline={null} />
            <Plain content="Eсли музыка транслируется не с компьютера участника, то нарушение рассматривается по пункту 4.1." />
            <Plain content="Если пользователь делал это неосознанно, или не знал, как устранить проблему - наказание может быть смягчено или снято." />
            <Description keyN="<b>Изменение голоса не через программу</b>" headline={null}
                         valueN=" - если человек меняет голос не через программу, то наказание вы ему не выдаете, а просите не перебарщивать с изменением. Если человек после вашего предупреждения продолжает самостоятельно изменять голос не через программы, то выдаётся наказание по пункту 3.3 (обращение к старшей администрации)."/>

        </div>
    )
}

export default Rule4p2;