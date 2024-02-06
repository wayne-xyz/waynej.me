import React from "react";
import Image from "next/image";
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
                            textLabel="Example Label thi is a card label here is a bout the swift python xtts"
                            timeLabel="3 hours ago"/>
                    </li>
                    <li >
                        <Card imageSrc="https://mui.com/static/images/cards/paella.jpg"
                            textLabel="Example Label thi is a card label"
                            timeLabel="3 hours ago"></Card>
                    </li>
                    <li>
                        <Card imageSrc="https://mui.com/static/images/cards/paella.jpg"
                            textLabel="Example Label thi is a card label"
                            timeLabel="3 hours ago"></Card>
                    </li>
                    <li>
                        <Card imageSrc="https://mui.com/static/images/cards/paella.jpg"
                            textLabel="Example Label thi is a card label"
                            timeLabel="3 hours ago"></Card>
                    </li>
                    <li>
                        <Card imageSrc="https://mui.com/static/images/cards/paella.jpg"
                            textLabel="Example Label thi is a card label"
                            timeLabel="3 hours ago"></Card>
                    </li>
                    <li>
                        <Card imageSrc="https://mui.com/static/images/cards/paella.jpg"
                            textLabel="Example Label thi is a card label"
                            timeLabel="3 hours ago"></Card>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Cardlist;