import React from "react";
import Plain from "../Templates/Plain";
import BulletPoints from "../Templates/BulletPoints";

const Rule1p12 = () => {
    return (
        <div className="rule-container">
            <Plain content="С данным пунктом правил обращаться к <r>старшей администрации</r>." />
            <BulletPoints headline="Примеры" content={[
                "Слив административной информации за пределами staff.",
                "DDOs-атака сервера ботами"

            ]} />
        </div>
    )
}

export default Rule1p12;