import React, { useState } from 'react';
import { ImageViewer } from './ImageViewer';

interface ImageGalleryProps {
    images: string[];
    alt?: string;
    className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
    images,
    alt = "Gallery image",
    className = ""
}) => {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openViewer = (index: number) => {
        setCurrentIndex(index);
        setViewerOpen(true);
    };

    const closeViewer = () => {
        setViewerOpen(false);
    };

    if (images.length === 0) return null;

    const renderSingleImage = () => (
        <div className={`relative w-full ${className}`}>
            <img
                src={images[0]}
                alt={alt}
                className="w-full h-96 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openViewer(0)}
            />
        </div>
    );

    const renderTwoImages = () => (
        <div className={`grid grid-cols-2 gap-2 ${className}`}>
            {images.slice(0, 2).map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`${alt} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openViewer(index)}
                />
            ))}
        </div>
    );

    const renderThreeImages = () => (
        <div className={`grid grid-cols-2 gap-2 ${className}`}>
            <img
                src={images[0]}
                alt={`${alt} 1`}
                className="w-full h-96 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openViewer(0)}
            />
            <div className="grid grid-rows-2 gap-2">
                {images.slice(1, 3).map((image, index) => (
                    <img
                        key={index + 1}
                        src={image}
                        alt={`${alt} ${index + 2}`}
                        className="w-full h-[187px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openViewer(index + 1)}
                    />
                ))}
            </div>
        </div>
    );

    const renderFourPlusImages = () => (
        <div className={`grid grid-cols-2 gap-2 ${className}`}>
            <img
                src={images[0]}
                alt={`${alt} 1`}
                className="w-full h-96 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => openViewer(0)}
            />
            <div className="grid grid-rows-2 gap-2">
                <img
                    src={images[1]}
                    alt={`${alt} 2`}
                    className="w-full h-[187px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => openViewer(1)}
                />
                <div className="relative">
                    <img
                        src={images[2]}
                        alt={`${alt} 3`}
                        className="w-full h-[187px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openViewer(2)}
                    />
                    {images.length > 3 && (
                        <div
                            className="absolute inset-0 bg-foreground/60 rounded-lg flex items-center justify-center cursor-pointer hover:bg-foreground/70 transition-colors"
                            onClick={() => openViewer(2)}
                        >
                            <span className="text-background text-2xl font-semibold">
                                +{images.length - 3}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const renderGallery = () => {
        switch (images.length) {
            case 1:
                return renderSingleImage();
            case 2:
                return renderTwoImages();
            case 3:
                return renderThreeImages();
            default:
                return renderFourPlusImages();
        }
    };

    return (
        <>
            {renderGallery()}
            {viewerOpen && (
                <ImageViewer
                    images={images}
                    currentIndex={currentIndex}
                    onClose={closeViewer}
                    onIndexChange={setCurrentIndex}
                />
            )}
        </>
    );
};