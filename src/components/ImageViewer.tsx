import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface ImageViewerProps {
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onIndexChange: (index: number) => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
    images,
    currentIndex,
    onClose,
    onIndexChange,
}) => {
    const goToPrevious = useCallback(() => {
        if (currentIndex > 0) {
            onIndexChange(currentIndex - 1);
        }
    }, [currentIndex, onIndexChange]);

    const goToNext = useCallback(() => {
        if (currentIndex < images.length - 1) {
            onIndexChange(currentIndex + 1);
        }
    }, [currentIndex, images.length, onIndexChange]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case 'Escape':
                onClose();
                break;
            case 'ArrowLeft':
            case '<':
                goToPrevious();
                break;
            case 'ArrowRight':
            case '>':
                goToNext();
                break;
        }
    }, [onClose, goToPrevious, goToNext]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [handleKeyDown]);

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center"
            onClick={handleBackdropClick}
        >
            {/* Close button */}
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-background hover:bg-background/20 hover:text-background"
                onClick={onClose}
            >
                <X className="h-6 w-6" />
            </Button>

            {/* Navigation arrows */}
            {images.length > 1 && (
                <>
                    {currentIndex > 0 && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-background hover:bg-background/20 hover:text-background"
                            onClick={goToPrevious}
                        >
                            <ChevronLeft className="h-8 w-8" />
                        </Button>
                    )}

                    {currentIndex < images.length - 1 && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-background hover:bg-background/20 hover:text-background"
                            onClick={goToNext}
                        >
                            <ChevronRight className="h-8 w-8" />
                        </Button>
                    )}
                </>
            )}

            {/* Image */}
            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                <img
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1} of ${images.length}`}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            {/* Image counter */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-foreground/60 text-background px-3 py-1 rounded-full text-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Thumbnail navigation */}
            {images.length > 1 && images.length <= 10 && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 bg-foreground/60 p-2 rounded-lg">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${index === currentIndex
                                    ? 'border-background scale-110'
                                    : 'border-transparent opacity-60 hover:opacity-80'
                                }`}
                            onClick={() => onIndexChange(index)}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};