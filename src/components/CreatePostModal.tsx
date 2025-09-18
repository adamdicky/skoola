"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UploadSimpleIcon, XCircleIcon } from "@phosphor-icons/react";

interface CreatePostModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreatePostModal({ open, onOpenChange }: CreatePostModalProps) {
    const [images, setImages] = useState<File[]>([]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[100vh] pr-2">
                <DialogHeader>
                    <DialogTitle className='text-2xl text-[#243056]'>Create a New Post</DialogTitle>
                    <DialogDescription className='leading-3'>
                        Share your classroom's updates and achievements.
                    </DialogDescription>
                </DialogHeader>


                <div className="flex flex-col gap-5 py-2">
                    {/* Title */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="title" className='text-[#243056] pb-1 font-semibold'>Title*</Label>
                        <Input id="title" placeholder="Enter a descriptive title for your post.." />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="content" className='text-[#243056] pb-1 font-semibold'>Description*</Label>
                        <Textarea id="content" placeholder="Share the details of the post.." rows={5} />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="tags" className='text-[#243056] pb-1 font-semibold'>Tags*</Label>
                        <Input id="tags" placeholder="Add tags (e.g. Examination, Activity).." />
                    </div>

                    {/* File Upload (images) */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="images" className='text-[#243056] pb-1 font-semibold'>Upload Images</Label>

                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                const files = Array.from(e.dataTransfer.files).filter((file) =>
                                    file.type.startsWith("image/")
                                );

                                if (files.length > 0) {
                                    setImages([...images, ...files]);
                                }
                            }}

                            className='flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-[#243056] rounded-lg cursor-pointer hover:bg-[#f8f9ff] transition'
                            onClick={() => document.getElementById('images')?.click()}
                        >
                            <UploadSimpleIcon size={40} className='text-[#6D76D5]' />
                            <a className='font-semibold text-[#243056]'>Upload Images</a>
                            <a className='font-small text-[#6E7793] italic text-center'>Click here or drag and drop (3 images maximum)</a>
                        </div>

                        <Input id="images" type="file" accept='image/' className='hidden' multiple onChange={(e) => {
                            if (!e.target.files) return;
                            const filesArray = Array.from(e.target.files);
                            setImages([...images, ...filesArray]);
                        }} />


                        {images.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-2 max-h-50 overflow-y-auto pr-2">
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
                </div>

                <DialogFooter>
                    <Button variant="outline" className='font-semibold hover:cursor-pointer' onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant='outline' type="submit" className='font-semibold bg-[#6D76D5] text-white hover:cursor-pointer hover:text-white hover:bg-[#6570ea]'>Create Post</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}
