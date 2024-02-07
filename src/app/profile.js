import React from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";

// this is main part of my info
const Profile = () => {
    return (
        <div className="md:flex p-10  max-w-4xl place-items-center">
            <Image className="rounded-full w-auto  md:h-auto"
                src="/photo.jpg"
                width={150}
                height={150}
                alt="Picture of the author"
            />
            <div className="font-medium p-8 ">
                <h1 id="name" className="text-lg font-large">Wayne J</h1>
                <h3 className="flex">Hi, I&apos;m Wayne, a Full-Stack Software Engineer. Currently pursuing my Master&apos;s degree in Computer Science at SMU Dallas, I specialize in developing web, mobile and GIS applications, focusing on creating seamless user experiences. I&apos;m also exploring the fascinating realm of machine learning. </h3>
                <ul className="flex space-x-4">
                    <li>
                        <a href="https://github.com/livingspring" >
                            <FaGithub></FaGithub></a>
                    </li>
                    <li><a href="https://www.linkedin.com/in/rongweiji/">
                        <FaLinkedin></FaLinkedin></a>
                    </li>
                    <a href="mailto:rji@smu.edu">
                        <li><FaEnvelope /></li>
                    </a>
                </ul>
            </div>
        </div>
    );
}

export default Profile;