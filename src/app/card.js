import React from "react";
import Image from "next/image";

const Card = (props) => {
    return (
        <div className="bg-slate-100 rounded-xl p-4 dark:bg-slate-800 m-2 max-w-80 max-h-96">
            <img className="object-cover h-48 w-96 " src={props.imageSrc} alt="Card" />
            <div className=" py-4">
                <div className=" text-lg font-medium mb-2">{props.textLabel}</div>
                <p className="text-gray-700 text-base">{props.timeLabel}</p>
            </div>
        </div>
    );
}

export default Card;