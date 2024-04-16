import * as React from 'react';
import { Link } from 'react-router-dom';

const ButtonComponent = ({field} : {field: string}) => {
    return <>
        <Link to={"/search/" + field}>
            <button className="border p-2 rounded-lg bg-gray-200 mx-1 my-0.5">{field}</button>
        </Link>
    </>
}

export default ButtonComponent;
