'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ArrowLeftIcon, GearSixIcon, ArticleIcon, PencilSimpleIcon, UploadSimpleIcon, XCircleIcon, ImageIcon } from '@phosphor-icons/react';
import SchoolBackground from '@/components/SchoolBackground';

export default function ManageSchoolPage() {
    const [openInfo, setOpenInfo] = useState(false);
    const [openBackground, setOpenBackground] = useState(false);
    const [openClubs, setOpenClubs] = useState(false);
    const [openClasses, setOpenClasses] = useState(false);

    const [clubs, setClubs] = useState<string[]>(["Musical Club", "Pantun Club"]);
    const [classes, setClasses] = useState<string[]>(["1 Cekal", "2 Amanah"]);

    const [newClub, setNewClub] = useState("");
    const [newClass, setNewClass] = useState("");

    const [isEditingInfo, setIsEditingInfo] = useState(false);

    const [images, setImages] = useState<File[]>([]);

    const [formData, setFormData] = useState({
        name: "SMK Kuala Kurau",
        addressline1: "123 Jalan Utama",
        addressline2: "Taman Indah",
        postcode: "34350",
        city: "Kuala Kurau",
        state: "Perak",
        country: "Malaysia",
    });

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-start w-full px-4 sm:px-6 md:px-10 lg:px-20">

            <div className='w-full max-w-5xl flex flex-col justify-between items-center pb-5'>
                <div className='w-full py-3 flex flex-col items-start gap-1'>
                    <Link
                        href="/dashboard/superadmin/"
                        className="group inline-flex items-center gap-2 text-xl font-bold text-[#243056] hover:text-[#4a5aa0] transition-colors"
                    >
                        <ArrowLeftIcon className="w-6 transform group-hover:-translate-x-1 transition-transform" />
                        <span className="underline text-left leading-0">Go back to School Posts</span>
                    </Link>
                </div>
                <div className='w-full pb-0 flex flex-col items-start gap-1'>
                    <h1 className='text-4xl font-bold text-[#243056]'>Manage School</h1>
                    <p className='text-[#243056] text-left'>
                        Change background for school, manage clubs and classes or request for school information change.
                    </p>
                </div>
            </div>


            <SchoolBackground />


            <div className='w-full max-w-270 py-5'>
                <div className='w-full bg-white rounded-lg p-6 border border-[#B2B8EE] flex flex-col gap-3'>


                    <div className="rounded-lg outline-1 outline-[#9298D0]">
                        <div className="flex flex-col max-w-270 md:flex-row items-center justify-between gap-4 bg-[#F3F4FE] p-5 rounded-lg">
                            <div className="flex-1 min-w-0 flex justify-center md:justify-start">
                                <span className='max-w-130 text-lg font-semibold text-center md:text-start text-[#243056]'>
                                    {formData.name}
                                </span>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-auto'>

                                <Button
                                    className={`rounded-full font-semibold min-w-[200px] hover:cursor-pointer ${openInfo
                                        ? "text-white bg-[#0095FF] border border-[#0095FF] hover:bg-[#30a9ff] hover:text-white"
                                        : "text-gray-600 bg-white border border-gray-300"
                                        }`}
                                    variant="ghost"
                                    onClick={() => {
                                        if (!openInfo) {
                                            setOpenInfo(true);
                                            setIsEditingInfo(true);
                                            setOpenBackground(false);
                                            setOpenClubs(false);
                                            setOpenClasses(false);
                                        } else {
                                            setOpenInfo(false);
                                            setIsEditingInfo(false);
                                        }

                                    }}
                                >
                                    {openInfo ? "Apply for Change" : "Request School Info Change"}
                                    {openInfo ? (
                                        <PencilSimpleIcon className="ml-1" />
                                    ) : (
                                        <ArticleIcon className="ml-1" />
                                    )}
                                </Button>


                                <Button
                                    className={`rounded-full font-semibold min-w-[200px] hover:cursor-pointer ${openBackground
                                        ? "text-white bg-[#0095FF] border border-[#0095FF] hover:bg-[#30a9ff] hover:text-white"
                                        : "text-gray-600 bg-white border border-gray-300"
                                        }`}
                                    variant="ghost"
                                    onClick={() => {
                                        setOpenBackground(!openBackground);
                                        setOpenInfo(false);
                                        setOpenClubs(false);
                                        setOpenClasses(false);
                                    }}
                                >
                                    {openBackground ? "Apply Background Image" : "Change Background Image"}
                                    {openBackground ? (
                                        <PencilSimpleIcon className="ml-1" />
                                    ) : (
                                        <ImageIcon className="ml-1" />
                                    )}
                                </Button>

                                <Button
                                    className={`rounded-full font-semibold min-w-[200px] hover:cursor-pointer ${openClubs
                                        ? "text-white bg-[#0095FF] border border-[#0095FF] hover:bg-[#30a9ff] hover:text-white"
                                        : "text-gray-600 bg-white border border-gray-300"
                                        }`}
                                    variant="ghost"
                                    onClick={() => {
                                        setOpenClubs(!openClubs);
                                        setOpenInfo(false);
                                        setOpenBackground(false);
                                        setOpenClasses(false);
                                    }}
                                >
                                    {openClubs ? "Save Changes" : "Manage Clubs"}
                                    <GearSixIcon className="ml-1" />
                                </Button>

                                <Button
                                    className={`rounded-full font-semibold min-w-[200px] hover:cursor-pointer ${openClasses
                                        ? "text-white bg-[#0095FF] border border-[#0095FF] hover:bg-[#30a9ff] hover:text-white"
                                        : "text-gray-600 bg-white border border-gray-300"
                                        }`}
                                    variant="ghost"
                                    onClick={() => {
                                        setOpenClasses(!openClasses);
                                        setOpenClubs(false);
                                        setOpenInfo(false);
                                        setOpenBackground(false);
                                    }}
                                >
                                    {openClasses ? "Save Changes" : "Manage Classes"}
                                    <GearSixIcon className="ml-1" />
                                </Button>
                            </div>


                        </div>

                        {openInfo && (
                            <div className="bg-[#F3F4FE]">
                                <div className="px-5 pb-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-5">
                                        {/* School Name */}
                                        <div className="flex flex-col space-y-2">
                                            <Label
                                                htmlFor="name"
                                                className={`font-semibold ${isEditingInfo ? "text-[#314073]" : "text-[#7B7C7D]"
                                                    }`}
                                            >
                                                School Name
                                            </Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                disabled={!isEditingInfo}
                                                onChange={(e) => handleChange("name", e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>

                                        {/* Address Line 1 */}
                                        <div className="flex flex-col space-y-2">
                                            <Label
                                                htmlFor="addressline1"
                                                className={`font-semibold ${isEditingInfo ? "text-[#314073]" : "text-[#7B7C7D]"
                                                    }`}
                                            >
                                                Address Line 1
                                            </Label>
                                            <Input
                                                id="addressline1"
                                                value={formData.addressline1}
                                                disabled={!isEditingInfo}
                                                onChange={(e) => handleChange("addressline1", e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>

                                        {/* Address Line 2 */}
                                        <div className="flex flex-col space-y-2">
                                            <Label
                                                htmlFor="addressline2"
                                                className={`font-semibold ${isEditingInfo ? "text-[#314073]" : "text-[#7B7C7D]"
                                                    }`}
                                            >
                                                Address Line 2
                                            </Label>
                                            <Input
                                                id="addressline2"
                                                value={formData.addressline2}
                                                disabled={!isEditingInfo}
                                                onChange={(e) => handleChange("addressline2", e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>

                                        {/* Postcode */}
                                        <div className="flex flex-col space-y-2">
                                            <Label
                                                htmlFor="postcode"
                                                className={`font-semibold ${isEditingInfo ? "text-[#314073]" : "text-[#7B7C7D]"
                                                    }`}
                                            >
                                                Postcode
                                            </Label>
                                            <Input
                                                id="postcode"
                                                value={formData.postcode}
                                                disabled={!isEditingInfo}
                                                onChange={(e) => handleChange("postcode", e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>

                                        {/* City */}
                                        <div className="flex flex-col space-y-2">
                                            <Label
                                                htmlFor="city"
                                                className={`font-semibold ${isEditingInfo ? "text-[#314073]" : "text-[#7B7C7D]"
                                                    }`}
                                            >
                                                City
                                            </Label>
                                            <Input
                                                id="city"
                                                value={formData.city}
                                                disabled={!isEditingInfo}
                                                onChange={(e) => handleChange("city", e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>

                                        {/* State */}
                                        <div className="flex flex-col space-y-2">
                                            <Label
                                                htmlFor="state"
                                                className={`font-semibold ${isEditingInfo ? "text-[#314073]" : "text-[#7B7C7D]"
                                                    }`}
                                            >
                                                State
                                            </Label>
                                            <Input
                                                id="state"
                                                value={formData.state}
                                                disabled={!isEditingInfo}
                                                onChange={(e) => handleChange("state", e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>

                                        {/* Country */}
                                        <div className="flex flex-col space-y-2">
                                            <Label
                                                htmlFor="country"
                                                className={`font-semibold ${isEditingInfo ? "text-[#314073]" : "text-[#7B7C7D]"
                                                    }`}
                                            >
                                                Country
                                            </Label>
                                            <Input
                                                id="country"
                                                value={formData.country}
                                                disabled={!isEditingInfo}
                                                onChange={(e) => handleChange("country", e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>
                                    </div>

                                    <hr className="border-t border-gray-400" />
                                    <span className="font-small text-[#6E7793] pt-3 block italic">
                                        Last Updated: 20 January by SMK Kuala Kurau
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* DIVIDER */}

                        {openBackground && (
                            <div className="bg-[#F3F4FE]">
                                <div className="px-5 pb-5">
                                    <div className="flex flex-col gap-1 pb-5">
                                        <Label htmlFor="images" className='text-[#243056] pb-1 font-semibold'>Upload Images</Label>

                                        <div
                                            onDragOver={(e) => e.preventDefault()}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                const file = Array.from(e.dataTransfer.files).find((file) =>
                                                    file.type.startsWith("image/")
                                                );

                                                if (file) {
                                                    setImages([file]);
                                                } else {
                                                    alert("Only image format is allowed.")
                                                }
                                            }}

                                            className='flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-[#243056] rounded-lg cursor-pointer hover:bg-[#f8f9ff] transition'
                                            onClick={() => document.getElementById('images')?.click()}
                                        >
                                            <UploadSimpleIcon size={40} className='text-[#6D76D5]' />
                                            <a className='font-semibold text-[#243056]'>Upload Images</a>
                                            <a className='font-small text-[#6E7793] italic text-center'>Click here or drag and drop.</a>
                                        </div>

                                        <Input id="images" type="file" accept='image/*' className='hidden' onChange={(e) => {
                                            if (!e.target.files) return;
                                            const file = e.target.files[0];
                                            // only allow image files
                                            if (file && file.type.startsWith("image/")) {
                                                setImages([file]); // replace with the single image
                                            } else {
                                                alert("Only image files are allowed.");
                                                e.target.value = ""; // clear invalid selection
                                            }
                                        }
                                        } />


                                        {images.length > 0 && (
                                            <div className="grid grid-cols-1 gap-2 mt-4 max-h-100 overflow-y-auto pr-2">
                                                {images.map((file, index) => (
                                                    <div key={index} className="relative group">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`preview-${index}`}
                                                            className="w-full h-32 object-cover rounded-lg border border-gray-300"
                                                        />
                                                        {/* Delete button */}
                                                        <button
                                                            type="button"
                                                            className="absolute top-1 right-1 text-red-500  rounded-full opacity-80 hover:opacity-100"
                                                            onClick={() => {
                                                                const newImages = [...images];
                                                                newImages.splice(index, 1);
                                                                setImages(newImages);
                                                            }}
                                                        >
                                                            <XCircleIcon size={20} weight="fill" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <hr className="border-t border-gray-400" />
                                    <span className="font-small text-[#6E7793] pt-3 block italic">
                                        Last Updated: 20 January by SMK Kuala Kurau
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* DIVIDER */}

                        {openClubs && (
                            <div className="bg-[#F3F4FE] px-5 pb-5">
                                <div className="flex flex-col gap-4 pb-5">

                                    {/* Add Club */}
                                    <div className="flex items-center gap-2">
                                        <Input
                                            placeholder="Enter new club name..."
                                            value={newClub}
                                            onChange={(e) => setNewClub(e.target.value)}
                                            className="bg-white"
                                        />
                                        <Button
                                            className="text-white bg-[#0095FF] hover:bg-[#30a9ff] rounded-full min-w-20 font-semibold hover:cursor-pointer"
                                            onClick={() => {
                                                if (!newClub.trim()) return;
                                                setClubs([...clubs, newClub]);
                                                setNewClub("");
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </div>

                                    {/* List Clubs */}
                                    <div className="flex flex-col gap-2">
                                        {clubs.length > 0 ? (
                                            clubs.map((club, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-2"
                                                >
                                                    <span className="text-[#243056] font-medium">{club}</span>
                                                    <button
                                                        onClick={() => {
                                                            setClubs(prev => prev.filter((_, i) => i !== idx));
                                                        }}
                                                        className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                                                    >
                                                        <XCircleIcon size={20} weight="fill" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="italic text-gray-500">No clubs added yet.</span>
                                        )}
                                    </div>
                                </div>


                            </div>
                        )}

                        {/* DIVIDER */}

                        {openClasses && (
                            <div className="bg-[#F3F4FE] px-5 pb-5">
                                <div className="flex flex-col gap-4 pb-5">

                                    {/* Add Class */}
                                    <div className="flex items-center gap-2">
                                        <Input
                                            placeholder="Enter new class name..."
                                            value={newClass}
                                            onChange={(e) => setNewClass(e.target.value)}
                                            className="bg-white"
                                        />
                                        <Button
                                            className="text-white bg-[#0095FF] hover:bg-[#30a9ff] rounded-full min-w-20 font-semibold hover:cursor-pointer"
                                            onClick={() => {
                                                if (!newClass.trim()) return;
                                                setClasses([...classes, newClass]);
                                                setNewClass("");
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </div>

                                    {/* List Classes */}
                                    <div className="flex flex-col gap-2">
                                        {classes.length > 0 ? (
                                            classes.map((cls, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-3 py-2"
                                                >
                                                    <span className="text-[#243056] font-medium">{cls}</span>
                                                    <button
                                                        onClick={() => {
                                                            setClasses(prev => prev.filter((_, i) => i !== idx));
                                                        }}
                                                        className="text-red-500 hover:text-red-700 hover:cursor-pointer"
                                                    >
                                                        <XCircleIcon size={20} weight="fill" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="italic text-gray-500">No classes added yet.</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
