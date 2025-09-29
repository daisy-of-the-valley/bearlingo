import React, { useEffect, useState, useRef } from "react";
import { ArrowLeftIcon } from "lucide-react";
import { gsap } from "gsap";
import toast from "react-hot-toast";
import Bear from "../../assets/Bear.svg";
import api from "../../lib/axios";
import { Draggable } from "gsap/Draggable";
import events from "../../../../backend/src/utils/networkingEvents";


const NetworkingSubtask3 = ({ userInfo = {}, onBack }) => {
    const [userReflections, setUserReflections] = useState([]);
    const [selectedReflection, setSelectedReflection] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [userEvents, setUserEvents] = useState([]);
    const bearRefs = useRef([]);
    const scaleRefs = useRef([]);
    const [eventSelected, setEventSelected] = useState("");

    gsap.registerPlugin(Draggable);
    const questions = [
        "I connected with someone new at this event and it was useful",
        "I learned something valuable at this event",
        "I feel more confident about networking after this event",
        "I have a clear next step to follow up with people I met"
    ];

    const getReflections = async () => {
        try {
            const reflections = await api.get("/users/me/networking/reflections",
                { withCredentials: true }
            );
            console.log("reflections: ", reflections.data.reflections);
            setUserReflections(reflections.data.reflections);
            setSelectedReflection(reflections.data.reflections[0]);
        } catch (error) {
            console.log("Erorr in retrieving reflections", error);
            toast.error("Erorr in retrieving reflections");
        }
    };

    const getUserEvents = async () => {
        try {
            const res = await api.get("/users/me/networking/events", {
                withCredentials: true,
            });
            setUserEvents(res?.data?.eventsToAttend[0].attendingEventIds || []);
            console.log("events: ", events);
            console.log("res?.data?.eventsToAttend", res?.data?.eventsToAttend[0].attendingEventIds);
        } catch (error) {
            console.error("User events were not fetched", error);
            toast.error("User events were not fetched");
        }
    };



    useEffect(() => {
        getReflections();
        getUserEvents();
    }, []);




    const saveReflection = async () => {
        try {
            const saveReflection = await api.post("/users/me/networking/reflections", {
                responses: userResponses,
                event: userEvent
            }, { withCredentials: true })

        } catch (error) {
            console.log("Erorr in saving reflection", error);
            toast.error("Error in saving reflection!");
        }
    };

    const handleSubmit = () => { }

    useEffect(() => {
        questions.forEach((_, index) => {
            if (!bearRefs.current[index] || !scaleRefs.current[index]) return;

            Draggable.create(bearRefs.current[index], {
                type: "x",
                bounds: scaleRefs.current[index],
                inertia: false,
                snap: (endValue) => Math.round(endValue / 80) * 80,
                onDragEnd: function () {
                    const step = Math.round(this.x / 80) + 1;
                    console.log(`Q${index + 1} selected value:`, step);
                },
            });
        });
    }, []);




    return (

        <div className="pt-16 bg-[#4f9cf9] relative min-h-screen flex flex-row min-w-0 gap-4 p-4 border border-green-500">
            {/* Go back */}

            <button
                className="btn btn-ghost absolute top-20 left-6 z-10"
                onClick={onBack}
            >
                <ArrowLeftIcon className="size-5" />
                Back to subtasks
            </button>


            <div className="flex flex-col gap-8 flex-1 mt-24 border border-red-500 bg-slate-500 p-3">
                <div>
                    <h2>Choose an event to write a refleciton about!</h2>
                    <div className="border border-red-500 h-[300px] w-[90%] overflow-y-auto bg-white rounded-xl p-4 flex flex-col gap-4">
                        {userEvents.map((userEvent, index) => {
                            const event = events.find(e => e.id === userEvent.eventId && userEvent.status == 'attended');
                            if (!event) return null;

                            const isSelected = eventSelected?.id === event.id;

                            return (
                                <button
                                    key={event.id}
                                    onClick={() => setEventSelected(event)}
                                    className={`flex flex-col p-4 rounded-xl shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl
          ${isSelected ? "bg-blue-500 text-white border-2 border-blue-700" : "bg-gray-100 text-gray-800"}
        `}
                                >
                                    <h3 className="font-bold text-lg">{event.name}</h3>
                                    <p className="text-sm">{event.date}</p>
                                    <p className="text-sm">{event.location}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div>{
                    questions.map((question, index) => (
                        <div key={index} className="flex flex-col items-start gap-2">
                            <p className="text-gray-800 font-medium">{question}</p>
                            <div
                                ref={(el) => (scaleRefs.current[index] = el)}
                                className="relative w-[400px] h-20 bg-gray-200 rounded-lg flex items-center"
                            >
                                <img
                                    ref={(el) => (bearRefs.current[index] = el)}
                                    src={Bear}
                                    alt="Bear"
                                    className="absolute top-[30px] left-[10px] w-12 h-12 cursor-pointer select-none"
                                />
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
            {/* Reflections UI */}
            <div className="flex-1 flex border border-blue-500 bg-gray-100 mt-24 ">
                {/* Left: Reflections List */}
                <div className="w-1/2 border-r border-gray-300 p-6 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">Past Reflections</h2>
                    <div className="space-y-4">
                        {userReflections.map((reflection, index) => (
                            <div
                                key={reflection._id || index}
                                onClick={() => setSelectedReflection(reflection)}
                                className={`p-4 rounded-xl shadow cursor-pointer transition ${selectedReflection === reflection
                                    ? "bg-blue-100 border border-blue-400"
                                    : "bg-white hover:bg-gray-50"
                                    }`}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Reflection {index + 1}
                                </h3>
                                <p className="text-sm text-gray-600 truncate">
                                    {/* Show first question as a preview */}
                                    {reflection.responses[0]?.question}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Reflection Detail */}
                <div className="w-1/2 p-6">
                    {selectedReflection ? (
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Reflection Details
                            </h2>
                            <ul className="space-y-3">
                                {selectedReflection.responses.map((resp) => (
                                    <li
                                        key={resp._id}
                                        className="p-3 border rounded-lg bg-gray-50"
                                    >
                                        <p className="font-medium text-gray-800">{resp.question}</p>
                                        <p className="text-gray-600">Answer: {resp.answer}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            {selectedReflection == null ? 'Create a reflection' : 'Select a reflection to view its details'}
                        </div>
                    )}
                </div>
            </div>
        </div >

    )
}

export default NetworkingSubtask3
