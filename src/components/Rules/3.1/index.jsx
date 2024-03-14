import React from "react";
import Plain from "../Templates/Plain";
import UserChat from "../Templates/UserChat";

const Rule3p1 = () => {
    return (
        <div className="rule-container">
            <UserChat headline="Пример:" content={[
                ["user-a", "Пользователь 1", "да че тебе нада", null],
                ["user-b", "Пользователь 2", "я админ, не выебывайся", null],
            ]} />
            <Plain content="Ники в виде <u>@Я админ</u> не являются нарушением правила, за исключением, когда человек это агитирует, что он таковым является на нашем сервере" />
        </div>
    )
}

export default Rule3p1;