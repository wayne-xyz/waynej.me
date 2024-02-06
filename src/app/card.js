import React from "react";

const Card = (props) => {
    return (
        <div className="bg-slate-100 rounded-xl p-6 dark:bg-slate-800 m-2">
            <img className="w-full" src={props.imageSrc} alt="Card" />
            <div className=" py-4">
                <div className=" text-lg font-medium mb-2">{props.textLabel}</div>
                <p className="text-gray-700 text-base">{props.timeLabel}</p>
            </div>
        </div>
    );
}

export default Card;