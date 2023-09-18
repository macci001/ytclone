import ButtonComponent from "./ButtonComponent";
import VideoComponent from "./VideoComponent";

const buttonList = [
    "Kapil",
    "Startups",
    "Entertainment",
    "Infotainment",
    "OpenSource",
    "Git",
    "Apple",
    "Blender",
    "Gadgets",
    "Google",
    "Facebook",
    "India",
    "Cricket",
    "Voice",
    "Sound",
    "Blender",
    "Gadgets",
    "Google",
    "Facebook",
    "Youtube",
    "Maps",
    "India",
    "Great"
]

const BodyComponent = () => {
    return (
        <>
            <div className="p-2 mt-[6vh]">
                <div className="overflow-auto no-scrollbar flex justtify-center items-center w-[100vw] h-[9vh] px-2">
                        {
                            buttonList.map((button, idx) => {
                                return <ButtonComponent key={idx} field={button} className="w-20 px-5"/>
                            })
                        }
                </div>
                <VideoComponent />
            </div>
        </>
    )
}
export default BodyComponent;
