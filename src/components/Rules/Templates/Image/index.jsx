import React from "react";

const Image = ({src, width = null, height = null}) => {
    return(
        <div className="rule-image-container">
            <img src={src} alt="rule-description" style={{height: height || (width ? 'unset' : '100%'), width: width || (height ? 'unset' : '100%')}}/>
        </div>
    )
}

export default Image;