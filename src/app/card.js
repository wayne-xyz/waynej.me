import React from "react";

const Card = (props) => {
    return (
        <div className="bg-slate-100 rounded-xl p-4 dark:bg-slate-800 m-2 max-w-80 max-h-96 hover:bg-slate-900">
            <img className="object-scale-down h-48 w-56  " src={props.imageSrc} alt="Card" />
            <div className=" py-4">
                <a href={props.githubLink}>
                <div className=" text-lg font-medium mb-2">{props.textLabel}</div></a>
                <p className="text-gray-700 text-base">{props.timeLabel}</p>
            </div>
        </div>
    );
}

export default Card;