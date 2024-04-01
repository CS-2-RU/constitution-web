import React from "react";
import Plain from "../Templates/Plain";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule1p8 = () => {
    return (
        <div className="rule-container">
            <Plain content="В случае если вы понимаете, что данное правило было нарушено, то вы открываете табличку к этому пункту и сравниваете высказывание пользователя с данной для вас <a> табличкой <c>1.8</c>." />
            <PunishmentTable
                data={[
                {
                    title: 'Случай 1',
                    description: 'Использование формы употребления родных как случай агресси или ненависти с употребление нецензурных слов или высказываний в адрес родителей. Считается прямое или косвенное упоминание*',
                    punishment: {
                        ban: null,
                        warn: true,
                        mute: null,
                        nar: null,
                    }
                },
                {
                    title: 'Случай 2 ( Normal )',
                    description: '<b>Случай 1</b> + употребление в адрес родителей высказываний* описывающих нанесение вреда здоровью, половых связий и прочих действий нарушающих рамки моральной и этической стороны*',
                    punishment: {
                        ban: '15 дней',
                        warn: null,
                        mute: null,
                        nar: null,
                    }
                },
                {
                    title: 'Случай 3 ( Hard )',
                    description: '<b>Случай 2</b> + употребление в адрес родителей высказываний которые содержат случаи летального исхода',
                    punishment: {
                        ban: '60 дней',
                        warn: null,
                        mute: null,
                        nar: null,
                    }
                },
            ]} />
        </div>
    )
}

export default Rule1p8;