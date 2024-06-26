import ButtonComponent from "./ButtonComponent";
import VideoComponent from "./VideoComponent";
import * as React from 'react';
import { buttonList } from "../consts/consts";

const BodyComponent = () => {
    return (
        <>
            <div className="p-2 mt-[6vh]">
                <div className="overflow-x-auto no-scrollbar flex items-center w-[100vw] h-[9vh] px-2 pb-8 pt-[3vw] md:pt-[8vh]">
                        {
                            buttonList.map((button, idx) => {
                                return <ButtonComponent key={idx} field={button} />
                            })
                        }
                </div>
                <VideoComponent />
            </div>
        </>
    )
}
export default BodyComponent;
