import React from "react";

const Card = (props) => {
    return (
        <div className="bg-slate-50 p-4  m-2 max-w-80 max-h-96 hover:bg-opacity-70 bg-opacity-40 backdrop-blur-md border border-opacity-60 rounded-lg shadow-lg border-white">
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