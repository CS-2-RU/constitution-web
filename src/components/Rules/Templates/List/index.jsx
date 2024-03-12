import React from "react";

const List = ({content, headline = "Примеры:"}) => {
    return (
        <div className="rule-list-container">
            <span className="rule-example-headline"
                  dangerouslySetInnerHTML={{__html: headline}}/>
            <div className="rule-list-container-elements">
                {content.map(list => (
                    <span className="rule-list-element" dangerouslySetInnerHTML={{__html: list}} />
                ))}
            </div>
        </div>

    )
}

export default List;