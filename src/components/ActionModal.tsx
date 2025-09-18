"use client";

import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface ActionModalProps {
    trigger: React.ReactNode; // what opens the modal (e.g. PencilSimpleIcon)
    onApprove?: () => void;
    onRemark?: (remark: string) => void;
    onReject?: (remark: string) => void;
    remarkText?: string;
}

export default function ActionModal({
    trigger,
    onApprove,
    onRemark,
    onReject,
    remarkText,
}: ActionModalProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-[#243056]">
                        Manage Post
                    </DialogTitle>
                    <DialogDescription className='leading-3'>
                        Approve, remark, or reject the post.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 py-4">
                    <Button
                        className="border font-semibold border-green-400 text-green-400 bg-green-50 hover:bg-green-400 rounded-full hover:cursor-pointer hover:text-white"
                        onClick={onApprove}
                    >
                        Approve
                    </Button>

                    <Button
                        className="border font-semibold border-blue-400 text-blue-400 bg-blue-50 hover:bg-blue-400 rounded-full hover:cursor-pointer hover:text-white"
                        onClick={() => {
                            if (!remarkText || remarkText.trim() === "") {
                                alert("Please provide remarks before remarking this post.");
                                return;
                            }
                            onRemark?.(remarkText);
                        }}
                    >
                        Remark
                    </Button>

                    <Button
                        className="border font-semibold border-red-500 text-red-500 bg-red-50 hover:bg-red-500 rounded-full hover:cursor-pointer hover:text-white"
                        onClick={() => {
                            if (!remarkText || remarkText.trim() === "") {
                                alert("Please provide remarks before rejecting this post.");
                                return;
                            }
                            onReject?.(remarkText);
                        }}
                    >
                        Reject
                    </Button>
                </div>


            </DialogContent>
        </Dialog>
    );
}
