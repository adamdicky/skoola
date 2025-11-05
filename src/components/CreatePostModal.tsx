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
    context: "classclub" | "school";
}

export default function CreatePostModal({ open, onOpenChange, context }: CreatePostModalProps) {

    // Form States
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState(""); // Comma-separated string (e.g., "Exam, Activity")
    const [images, setImages] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const description = context === "school"
        ? "Share your school's updates or achievements. (Posts are auto-approved)"
        : "Share your classroom's/club's updates or achievements. (Posts require admin approval)"

    // Helper to clear the form fields and close the modal
    const clearFormAndClose = () => {
        setTitle("");
        setContent("");
        setTags("");
        setImages([]);
        setError(null);
        onOpenChange(false);
    }

    // NOTE: In a complete application, image uploads to Supabase Storage 
    // must happen BEFORE the post is created in the database. 
    // This function skips the upload step for now and sends dummy image data.
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!title || !content) {
            setError("Title and Description are required.");
            setLoading(false);
            return;
        }

        // --- Image Upload Placeholder ---
        // You would typically upload images here and get back the paths/IDs.
        const mockImagePath = images.length > 0 ? "mock/path/for/storage" : null;
        const mockBucketId = "posts";
        const mockImageIds = images.map((_, i) => `mock-id-${i}`);
        // --------------------------------

        const postData = {
            title,
            content,
            tags, // String of comma-separated tags
            // NOTE: The API relies on the backend fetching the teacher's class_id/club_id 
            // from their session (users.class_id/club_id) if their role is 'teacher'.
            // For admins (context='school'), the backend auto-assigns post_type='school'.
            images_path: mockImagePath,
            bucket_id: mockBucketId,
            images_id: mockImageIds,
            // class_id and club_id are intentionally omitted, expecting the backend to infer them from the user session.
        };

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postData),
            });

            const result = await res.json();

            if (!res.ok) {
                // API handlers typically return a JSON response with an error message
                throw new Error(result.msg || "Failed to create post.");
            }

            // Success
            alert(`Post created successfully! Status: ${context === 'school' ? 'Approved' : 'Pending'}.`);
            clearFormAndClose();

            // Optional: Reload teacher posts list after successful creation
            // You would need to pass a refresh function down from the TeacherDashboardPage
            // For example: if (onPostCreated) onPostCreated();

        } catch (err: any) {
            console.error("Post submission failed:", err);
            setError(err.message || "An unexpected error occurred during submission.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[100vh] pr-2">
                <DialogHeader>
                    <DialogTitle className='text-2xl text-[#243056]'>Create a New Post</DialogTitle>
                    <DialogDescription className='leading-3'>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="text-red-600 border border-red-300 p-2 rounded-lg">{error}</div>
                )}

                {/* Form starts here */}
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5 py-2">
                        {/* Title */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="title" className='text-[#243056] pb-1 font-semibold'>Title*</Label>
                            <Input
                                id="title"
                                placeholder="Enter a descriptive title for your post.."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="content" className='text-[#243056] pb-1 font-semibold'>Description*</Label>
                            <Textarea
                                id="content"
                                placeholder="Share the details of the post.."
                                rows={5}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-col gap-1">
                            <Label htmlFor="tags" className='text-[#243056] pb-1 font-semibold'>Tags (Optional)</Label>
                            <Input
                                id="tags"
                                placeholder="Add tags (e.g. Examination, Activity) - separated by comma"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
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
                                        setImages([...images, ...files].slice(0, 3)); // Limit to 3
                                    }
                                }}

                                className='flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-[#243056] rounded-lg cursor-pointer hover:bg-[#f8f9ff] transition'
                                onClick={() => document.getElementById('image-upload-input')?.click()}
                            >
                                <UploadSimpleIcon size={40} className='text-[#6D76D5]' />
                                <a className='font-semibold text-[#243056]'>Upload Images</a>
                                <a className='font-small text-[#6E7793] italic text-center'>Click here or drag and drop (3 images maximum)</a>
                            </div>

                            <Input
                                id="image-upload-input"
                                type="file"
                                accept='image/*'
                                className='hidden'
                                multiple
                                onChange={(e) => {
                                    if (!e.target.files) return;

                                    const filesArray = Array.from(e.target.files);
                                    const validImages = filesArray.filter((file) => file.type.startsWith("image/"));

                                    if (validImages.length !== filesArray.length) {
                                        alert("Only image files are allowed.");
                                    }

                                    const newImages = [...images, ...validImages].slice(0, 3);
                                    setImages(newImages);

                                    // clear selection
                                    e.target.value = "";
                                }}
                            />


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
                                                className="absolute top-1 right-1 text-red-500 rounded-full opacity-80 hover:opacity-100"
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
                        <Button
                            variant="outline"
                            className='font-semibold hover:cursor-pointer'
                            onClick={() => onOpenChange(false)}
                            type="button" // Important: prevents accidental submission
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className='font-semibold bg-[#6D76D5] text-white hover:cursor-pointer hover:text-white hover:bg-[#6570ea]'
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Post"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}