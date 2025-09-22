"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";


interface CreateUserModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CreateUserModal({ open, onOpenChange }: CreateUserModalProps) {
    const [images, setImages] = useState<File[]>([]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[700px] overflow-y-auto max-h-[100vh] pr-2">
                <DialogHeader>
                    <DialogTitle className='text-2xl text-[#243056]'>Create a New User</DialogTitle>
                    <DialogDescription className='leading-3'>
                        Add a new User (Teacher or Admin) to your school.
                    </DialogDescription>
                </DialogHeader>


                <div className="flex flex-col gap-5 py-2">
                    {/* Display Name */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="displayname" className='text-[#243056] pb-1 font-semibold'>Display Name*</Label>
                        <Input id="displayname" placeholder="Teacher / Sir / Madam / Mr. / Mrs." />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="email" className='text-[#243056] pb-1 font-semibold'>Email*</Label>
                        <Input id="email" placeholder="xyz@gmail.com" />
                    </div>

                    {/* Role */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="role" className='text-[#243056] pb-1 font-semibold'>Role*</Label>
                        <Select>
                            <SelectTrigger className="bg-white w-full">
                                <SelectValue placeholder="Admin / Teacher" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="teacher">Teacher</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Assign To? */}
                    <div className="flex flex-col gap-1">
                        <Label htmlFor="role" className='text-[#243056] pb-1 font-semibold'>Assign To*</Label>
                        <Select>
                            <SelectTrigger className="bg-white w-full">
                                <SelectValue placeholder="To existing club/class or create new one." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Teacher">Teacher</SelectItem>
                                <SelectItem value="Admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" className='font-semibold hover:cursor-pointer' onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant='outline' type="submit" className='font-semibold bg-[#6D76D5] text-white hover:cursor-pointer hover:text-white hover:bg-[#6570ea]'>Create New User</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}
