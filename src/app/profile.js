import React from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import Cardlist from "./cardlist";

const Profile = () => {
    return (
        <div className="flex p-10  max-w-4xl items-center">
            <Image className="rounded-full w-auto  md:h-auto "
                src="/../photo.jpg"
                width={150}
                height={150}
                alt="Picture of the author"
            />
            <div className="font-medium p-8">
                <h1 id="name" className="text-lg font-large">Wayne J</h1>
                <h3 className="">Hi, I'm Wayne, a Full-Stack Software Engineer. Currently pursuing my Master's degree in Computer Science at SMU Dallas, I specialize in developing web, mobile and GIS applications, focusing on creating seamless user experiences. I'm also exploring the fascinating realm of machine learning. </h3>
                <ul className="flex space-x-4">
                    <li>
                        <FaGithub></FaGithub>
                    </li>
                    <li><FaLinkedin></FaLinkedin></li>
                    <li><FaEnvelope /></li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;