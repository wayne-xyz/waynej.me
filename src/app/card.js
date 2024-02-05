import React from "react";

const Card = (imageSrc,textLabel,timeLabel) => {
    return (
        <div class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
        <img className="w-full" src={imageSrc} alt="Card" />
        <div className="px-6 py-4">
          <div className=" text-lg font-medium mb-2">{textLabel}</div>
          <p className="text-gray-700 text-base">{timeLabel}</p>
        </div>
      </div>
    );
}

export default Card;