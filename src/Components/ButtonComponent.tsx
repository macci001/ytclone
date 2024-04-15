import * as React from 'react';

const ButtonComponent = ({field} : {field: string}) => {
    return <>
        <button className="border p-2 rounded-lg bg-gray-200 mx-1 my-1 w-5">{field}</button>
    </>
}

export default ButtonComponent;
