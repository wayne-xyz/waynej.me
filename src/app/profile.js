import React from "react";
import Image from "next/image";

import { GithubIcon, Linkedin, Mail } from "lucide-react";

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
                        <a href="https://github.com/wayne-xyz">
                            <GithubIcon className="w-6 h-6 m-1" />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/wayneji/">
                            <Linkedin className="w-6 h-6 m-1" />
                        </a>
                    </li>
                    <li>
                        <a href="mailto:rji@smu.edu">
                            <Mail className="w-6 h-6 m-1" />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Profile;