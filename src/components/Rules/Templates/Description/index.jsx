import React from "react";

const Description = ({keyN, valueN, headline = "Пример:"}) => {
    return(
        <div className="rule-description-contsiner">
            {headline && <span className="rule-example-headline"
                               dangerouslySetInnerHTML={{__html: headline}}/>}
            <div className="rule-description-element">
                <span className="rule-description-key" dangerouslySetInnerHTML={{__html: keyN}} />
                <span className="rule-description-value" dangerouslySetInnerHTML={{__html: valueN}} />
            </div>
        </div>
    )
}

export default Description;