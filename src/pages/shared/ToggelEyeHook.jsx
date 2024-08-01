import React, { useState } from 'react';
import { faEye,faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function usePasswordToggle () {
    const [visibality,setVisibility] = useState(false);
    const Icon = (
        <FontAwesomeIcon icon={visibality? faEye : faEyeSlash}
        onClick={()=>setVisibility(!visibality)}
        />
    )
    const inputType = visibality? "text" : "password";
    return [inputType,Icon];
}
export default usePasswordToggle;

