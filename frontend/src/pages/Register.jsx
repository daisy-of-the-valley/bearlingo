import React from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon } from 'lucide-react';
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // ---- Regex helpers ----
    const nameRegex = /^[A-Za-z\s]{2,30}$/;
    const usernameRegex = /^[\w\s-]{3,20}$/;
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    const linkedInRegex = /^((https?:\/\/)?(www\.)?linkedin\.com\/.*)$/;

    const validateInputs = () => {
        if (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            toast.error("All fields marked with * are required.");
            return false;
        }

        if (!nameRegex.test(firstName)) {
            toast.error("First Name must be 2–30 letters only.");
            return false;
        }
        if (!nameRegex.test(lastName)) {
            toast.error("Last Name must be 2–30 letters only.");
            return false;
        }

        if (!usernameRegex.test(username)) {
            toast.error("Username must be 3–20 characters (letters, numbers, _, -, space).");
            return false;
        }

        if (!emailRegex.test(email)) {
            toast.error("Please use a valid Gmail address.");
            return false;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return false;
        }
        if (!/[a-z]/.test(password)) {
            toast.error("Password must contain at least one lowercase letter.");
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            toast.error("Password must contain at least one uppercase letter.");
            return false;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return false;
        }

        if (linkedIn.trim() !== "" && !linkedInRegex.test(linkedIn.trim())) {
            toast.error("Please enter a valid LinkedIn URL.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault() // prevents the values inside the input from changing to default/empty values when register button is pressed
        if (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            toast.error("All red fields that are  marked with * required to be filled"); // Checks if there are not any input in the fields or an empty value which triggers an error 
            return
        }

        if (!validateInputs()) return; // stop if validation fails

        setLoading(true);
        console.log("LinkedIn-->", linkedIn, "<--");
        console.log("linkedIn === no space", linkedIn === "");            // true -> empty string
        console.log("linkedIn === space ", linkedIn === " ");            // false -> not empty
        console.log(linkedIn.trim() === "");     // true -> only whitespac
        try {
            await axios.post("http://localhost:8080/api/users/register", {
                firstName,
                lastName,
                username,
                email,
                password,
                confirmPassword,
                linkedIn: linkedIn.trim() === "" ? undefined : linkedIn.trim()
            })
            toast.success("You registered sucessfully!");
            navigate("/login"); // This should navigate to login pagr
        } catch (error) {
            console.log("Error in registering", error);
            toast.error("Failed to register! Please try again");

        } finally {
            setLoading(false);
        }

    }


    return (
        <>
            <div className=" min-h-screen bg-base-300">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-2xl, mx-auto">
                        <Link to={"/"} className="btn btn-ghost mb-6">
                            <ArrowLeftIcon className="size-5" />
                            Back to Home
                        </Link>

                        <div className="card bg-base-100">
                            <div className="card-body">
                                <h2 className="card-title text-2xl mb flex justify-center">
                                    Register
                                </h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex gap-4">
                                        <div className="form-control mb-4 w-full">
                                            <label className="label">
                                                <span className="label-text">First Name</span>
                                            </label>
                                            <input type="text"
                                                placeholder="First Name"
                                                className="input input-bordered"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}></input>
                                        </div>
                                        <div className="form-control mb-4  w-full">
                                            <label className="label">
                                                <span className="label-text">Last Name</span>
                                            </label>
                                            <input type="text"
                                                placeholder="Last Name"
                                                className="input input-bordered"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}></input>
                                        </div>
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Username</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Username"
                                            className="input input-bordered"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}></input>
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">LinkedIn (Optional)</span>
                                        </label>
                                        <input type="text"
                                            placeholder="LinkedIn"
                                            className="input input-bordered"
                                            value={linkedIn}
                                            onChange={(e) => setLinkedIn(e.target.value)}></input>
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Email"
                                            className="input input-bordered"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}></input>
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Password"
                                            className="input input-bordered"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}></input>
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Confirm Password</span>
                                        </label>
                                        <input type="text"
                                            placeholder="Confirm Password"
                                            className="input input-bordered"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}></input>
                                    </div>
                                    <div className="card-actions justify-center mb-2 h-20">
                                        <button type="submit" className="btn btn-primary w-40 h-18" disable={loading}>
                                            {loading ? "Registering ..." : "Register"}
                                        </button>
                                    </div>
                                </form>
                            </div>

                        </div>

                    </div>
                </div>

            </div >

        </>
    )
}

export default Register
