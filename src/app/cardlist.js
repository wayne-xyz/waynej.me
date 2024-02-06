import React from "react";
import Image from "next/image";
import Card from "./card";

const Cardlist = () => {
    return (
        <div>
            <div>
                Projects
            </div>
            <div className="flex ">
                <ul className="flex ">
                    <li  >
                        <Card imageSrc="https://mui.com/static/images/cards/paella.jpg"
                            textLabel="Example Label thi is a card label"
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