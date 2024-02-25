"use client"
import { useEffect } from "react";
import { useClientRouter } from 'next/client';
import React from "react";

const Backgournd = () => {
    
    useEffect(() => {
        generatePattern();
    }, []);

    const generatePattern = () => {
        const colors = ['#123C69', '#EDC7B7', '#EEE2DC', '#BAB2B5', '#AC3B61']; // Array of colors
        const wallpaper = document.getElementById('wallpaper');
        let pattern = '';

        for (let i = 0; i < 200; i++) {
            const width = Math.random() * 300 + 50; // Random width between 50 and 100 pixels
            const height = Math.random() * 300 + 50; // Random height between 50 and 100 pixels
            const left = Math.random() * 300; // Random left position
            const top = Math.random() * 300; // Random top position
            const color = colors[Math.floor(Math.random() * colors.length)]; // Random color from array

            pattern += `<div style="position: absolute; width: ${width}px; height: ${height}px; left: ${left}%; top: ${top}%; background-color: ${color};"></div>`;
        }

        wallpaper.innerHTML = pattern;
    };

    return (
        <div id="wallpaper" className="fixed top-0 left-0 w-full h-full bg-gray-800 z-[-1]"></div>
    );
};

export default Backgournd;