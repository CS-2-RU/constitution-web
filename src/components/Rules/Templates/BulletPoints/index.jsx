import React from "react";

const BulletPoints = ({content, headline = "Пример:"}) => {
    return (
        <div className="rule-bullet-points-container">
            <span className="rule-example-headline"
                  dangerouslySetInnerHTML={{__html: headline}}/>
            {content.map(point => (
                <span className="rule-bullet-point" dangerouslySetInnerHTML={{__html: '- ' + point}} />
            ))}
        </div>

    )
}

export default BulletPoints;