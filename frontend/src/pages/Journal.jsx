import React from 'react';
import Navbar from '../components/TopNavbar';
import ComputerFrame from '../assets/computer-screen.png';
import MonitorImage from '../assets/journal-monitor.svg';
import { useState } from "react";
import { Modal, Button } from "daisyui";
import YellowFolder from "../assets/folder-yellow.svg";
import PinkFolder from "../assets/folder-pink.svg";
import BlueFolder from "../assets/folder-blue.svg";
import AddFolderImage from '../assets/add-folder-icon.svg';

const Journal = () => {
    const [openFolder, setOpenFolder] = useState(false);
    const [openFile, setOpenFile] = useState(false);
    const [folders, setFolders] = useState([
        { name: "Reflections", image: PinkFolder, files: ["First Networking event!", "25/03/2025"] },
        { name: "Goals", image: YellowFolder, files: ["Major goals", "Refining goals"] },
        { name: "Notes", image: BlueFolder, files: ["Jobs to apply to", "{date}"] },
    ]);

    const addAddFile = () => {
        const folderName = prompt("Enter folder name"); // Simple prompt for folder name
        return (
            <div className="mockup-window border bg-base-300">
                <div className="flex justify-center bg-base-200 p-6">
                    <h1 className="text-2xl font-bold">Your React Component</h1>
                    <p>This content looks like it’s inside a computer window.</p>
                </div>
            </div>
        );

    };
    return (
        <>
            <Navbar />
            <div className="bg-blue-200 min-h-screen border">
                <div className="flex justify-center items-center h-[calc(100vh-65px)]">
                    {/* side navbar here */}
                    <div className="flex justify-center items-center">
                        <div className="relative w-3/4">
                            {/* Full monitor image */}
                            <img
                                src={MonitorImage}
                                alt="Monitor"
                                className="w-full h-auto"
                            />

                            {/* Top header to add folder - do we need this? */}

                            <div className="absolute top-[9%] left-[5.25%] w-[88.85%] h-10 flex items-center px-4"
                                style={{ backgroundColor: 'rgba(67,109,133,0.30)' }}>
                                <img src={AddFolderImage} alt="icon" className="h-7 w-auto ml-1" />
                                {/*<p className="text-white font-bold">Its Goal Setting Time User!</p>*/}
                            </div>

                            <div className="absolute top-[20%] right-[9%] flex flex-col items-center gap-8">
                                {folders.map((folder, index) => (
                                    <div key={index} className="flex flex-col items-center cursor-pointer">
                                        <button onClick={() => setOpenFolder(folder)}>
                                            <img
                                                src={folder.image}
                                                alt={folder.name}
                                                className="w-16 h-auto"
                                            />
                                        </button>
                                        <span className="text-black text-sm mt-1">{folder.name}</span>
                                    </div>
                                ))}
                            </div>

                            {openFolder && (<div className="absolute left-[6.5%] right-[7%] top-[16%] h-[480px] bg-white shadow-lg rounded-md p-4 overflow-y-auto">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <h2 className="font-bold text-lg">{openFolder.name}</h2>
                                    <button
                                        className="btn btn-xs btn-error"
                                        onClick={() => setOpenFolder(null)} // close
                                    >
                                        X
                                    </button>
                                </div>
                                <ul className="mt-4 space-y-2">
                                    {openFolder.files.map((file, i) => (
                                        <li
                                            key={i}
                                            className="p-2 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer"
                                        >
                                            {file}
                                        </li>
                                    ))}
                                </ul>
                            </div>)}
                        </div>




                        {/* Top nav bar */}
                        {/* <div className="bg-slate-500/30 shadow-sm h-[50px] p-3 flex items-center justify-center">
                            <a className="text-white font-bold">Its Goal Setting Time User!</a>
                        </div> */}

                        {/* Folders */}
                        {/* <div className="flex flex-col items-end gap-2 ml-[750px] mt-[10px] mr-[10px] w-[100px] h-[318px] rounded-lg bg-rose-300 ">
                            {folders.map((folder, index) => (
                                <div
                                    key={index}
                                    className="w-16 h-16 flex flex-col items-center m-4 cursor-pointer"
                                >
                                    <button onClick={() => setOpenFolder(folder)}>
                                        {console.log("folder: ", folder)}
                                        <img
                                            src={FolderImage}
                                            alt="Folder"
                                            className="w-12 h-12 flex justify-center"
                                        />
                                    </button>
                                    <span className="text-white text-sm mt-1">{folder.name}</span>
                                </div>
                            ))}
                        </div> */}

                        {/* Files of a folder */}
                    </div>

                    {/*<div className="w-16 h-10 bg-gray-700 mx-auto rounded-b-full"></div>*/}
                    {/* <div className="w-56 h-[70px] bg-gray-700 mx-auto"></div> */}
                </div >
            </div >

        </>
    )
}

export default Journal
