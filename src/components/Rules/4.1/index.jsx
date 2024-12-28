import React from "react";
import Description from "../Templates/Description";
import Plain from "../Templates/Plain";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule4p1 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            localban: '7 дней',
                        }
                    }
                ]} />
            <Description keyN="<b>Трансляция громких звуков</b>" headline={null} valueN=" - программы и утилиты для трансляции звуков через микрофон (Soundpad, Clownfish, Voice Mod и т.д.)" />
            <Plain content="Важно понимать, что если вы не уверены, что человек изменяет голос через программы, то вы должны его проверить на наличие программ для изменения голоса. В случае, если вы ничего не находите, то наказание вы не выдаёте." />
            <Plain content="В приватных румах разрешено использование программ, с разрешения хоста румы." />
        </div>
    )
}

export default Rule4p1;