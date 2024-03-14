import React from "react";
import Plain from "../Templates/Plain";
import BulletPoints from "../Templates/BulletPoints";
import UserChat from "../Templates/UserChat";

const Rule1p9 = () => {
    return (
        <div className="rule-container">
            <Plain content="Все что как либо относиться к политике." />
            <UserChat headline="Пример нарушающие правила" content={[
                ["user-a", "Пользователь 1", "Слава Украине!", null],
                ["user-b", "Пользователь 2", "Чел ты живешь в Украине помойке, а еще у тебя матери нет ХААХАХАХХ )0))))0)))))0.", null],
                ["user-a", "Пользователь 1", "Ну про мать было лишнее, а ещё Россия в 1000 раз хуже, у нас хотя бы есть свобода слова.", null],
            ]} />
            <UserChat headline="Пример НЕ ЯВЛЯЮЩИМСЯ 1.9:" content={[
                ["user-a", "Пользователь 1", "Как думаете, когда было лучше в США? По моему мнению, в 80-ых самая атмосфера тогда была)", null],
                ["user-b", "Пользователь 2", "Не думаю, как по мне щас выросла экономика, есть некоторые траблы, но это взаимозаменяется тем, что тогда бандиты творили :)", null],
            ]} />
        </div>
    )
}

export default Rule1p9;