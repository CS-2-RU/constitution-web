import React from "react";
import Plain from "../Templates/Plain";
import UserChat from "../Templates/UserChat";
import PunishmentTable from "../Templates/PunishmentTable";

const Rule3p1 = () => {
    return (
        <div className="rule-container">
            <PunishmentTable
                data={[
                    {
                        title: '1',
                        punishment: {
                            timeout: '2 часа',
                            warn: true,
                        }
                    },
                    {
                        title: '2',
                        punishment: {
                            timeout: '24 часа',
                            localban: '90 дней',
                        }
                    },
                ]} />
            <UserChat headline="Пример:" content={[
                ["user-a", "Пользователь 1", "да че тебе нада", null],
                ["user-b", "Пользователь 2", "я админ, не выебывайся, а то забаню", null],
            ]} />
            <Plain content="Ники в виде <u>@Я админ</u> не являются нарушением правила, за исключением, когда человек это агитирует, что он таковым является на нашем сервере" />
        </div>
    )
}

export default Rule3p1;