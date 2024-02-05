import React from "react";
import Image from "next/image";
import Card from "./card";

const Cardlist = () => {
    return (
        <div>
            <div>
                Projects
            </div>
            <div className="grid">
                <ul>
                    <li>
                        <Card imageSrc="https://example.com/image.jpg"
                            textLabel="Example Label thi is a card label"
                            timeLabel="3 hours ago"></Card>
                    </li>
                    <li>
                        <Card imageSrc="https://example.com/image.jpg"
                            textLabel="Example Label thi is a card label"
                            timeLabel="3 hours ago"></Card>
                    </li>
                    <li>
                        <Card imageSrc="https://example.com/image.jpg"
                            textLabel="Example Label thi is a card label"
                            timeLabel="3 hours ago"></Card>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Cardlist;