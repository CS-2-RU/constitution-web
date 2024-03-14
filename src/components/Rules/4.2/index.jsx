import React from "react";
import Plain from "../Templates/Plain";
import Description from "../Templates/Description";

const Rule4p2 = () => {
    return (
        <div className="rule-container">
            <Description keyN="<b>Помехи в голосовых каналах</b>" valueN=" - шумы, крики, стоны от участника" headline={null} />
            <Plain content="Важно понимать, что если вы не уверены, что человек изменяет голос через программы, то вы должны его проверить на наличие программ для изменения голоса. В случае, если вы ничего не находите, то наказание вы не выдаёте. Так же важно понимать, что если человек меняет голос не через программу, то наказание вы ему не выдаете, а просите не перебарщивать с изменением. Если человек после вашего предупреждения продолжает самостоятельно изменять голос не через программы, то выдаётся наказание по пункту <c>3.3</c> (обращение к старшей администрации)" />
            <Plain content="Важно заметить, если музыка транслируется не с компьютера участника, а, например, играет у него с помощью колонки на заднем фоне, то нарушение рассматривается по пункту <c>4.1</c>" />
        </div>
    )
}

export default Rule4p2;