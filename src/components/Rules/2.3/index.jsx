import React from "react";
import Plain from "../Templates/Plain";

const Rule2p3 = () => {
    return (
        <div className="rule-container">
            <Plain content="В это правило включаются игры на скины, трейды, раздачи и т.п." />
            <Plain content="Однако существуют ситуации, в которых нужно проверять отдельные ссылки, которые скидывает пользователь. Вполне вероятно эти ссылки могут оказаться фишинговыми, тогда это будет правилом <c>1.6</c>." />
        </div>
    )
}

export default Rule2p3;