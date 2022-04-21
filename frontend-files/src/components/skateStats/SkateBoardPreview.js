import React from 'react';
import skateImg from "../../images/skateStats/skate.png"

function SkateBoardPreview(props) {
    return (
        <div className='skate-preview'>
            <img className='skate-img' src={skateImg} alt="Skate"/>
        </div>
    );
}

export default SkateBoardPreview;