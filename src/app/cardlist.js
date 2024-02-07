import React from "react";
import Card from "./card";

const Cardlist = () => {
    return (
        <div className=" ">
            <div className="flex justify-center">
                Projects
            </div>
            <div className="flex ">
                <ul className="flex justify-center flex-wrap ">
                    <li  className="">
                        <Card imageSrc="https://raw.githubusercontent.com/livingspring/Voice-Translator/master/animation1.gif"
                            textLabel="Voice-Translator"
                            timeLabel="Dec 2023 Completed"
                            githubLink="https://github.com/livingspring/Voice-Translator"
                            />
                    </li>
                    <li >
                        <Card imageSrc="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                            textLabel="Incoming"
                            timeLabel="3 hours ago"></Card>
                    </li>
                    <li >
                        <Card imageSrc="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
                            textLabel="Incoming"
                            timeLabel="3 hours ago"></Card>
                    </li>
                 
                 
                </ul>
            </div>
        </div>
    );
}

export default Cardlist;