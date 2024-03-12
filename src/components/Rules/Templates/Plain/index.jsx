import React from "react";

const Plain = ({content, headline = null}) => {
    return(
        <div className="rule-example-plain">
            {headline && <span className="rule-example-headline">{headline}</span>}
            <span className="rule-example-plain-text" dangerouslySetInnerHTML={{__html: content}} />
        </div>
    )
}

export default Plain;