import React, { useState } from "react";
const LightGallery = () => {
  const images = [
    {
      id: 1,
      src: "https://unsplash.com/photos/Vw3a0HgE7AM/download?force=true",
      alt: "Nature Scene 1",
    },
    {
      id: 2,
      src: "https://unsplash.com/photos/Aj9fKhBSEpw/download?force=true",
      alt: "Nature Scene 2",
    },
    {
      id: 3,
      src: "https://unsplash.com/photos/SVQZMj7co6g/download?force=true",
      alt: "Nature Scene 3",
    },
    {
      id: 4,
      src: "https://unsplash.com/photos/2BWSUgdHWMI/download?force=true",
      alt: "Nature Scene 4",
    },
    {
      id: 5,
      src: "https://unsplash.com/photos/MCQP5SgyG7U/download?force=true",
      alt: "Nature Scene 5",
    },
    {
      id: 6,
      src: "https://unsplash.com/photos/58tP7g7x1LQ/download?force=true",
      alt: "Nature Scene 6",
    },
    {
      id: 7,
      src: "https://unsplash.com/photos/p2URciDs6tE/download?force=true",
      alt: "Nature Scene 7",
    },
    {
      id: 8,
      src: "https://unsplash.com/photos/78kaMQmUUq4/download?force=true",
      alt: "Nature Scene 8",
    },
    {
      id: 9,
      src: "https://unsplash.com/photos/cNoorc8uDyI/download?force=true",
      alt: "Nature Scene 9",
    },
    {
      id: 10,
      src: "https://unsplash.com/photos/T-0EW-SEbsE/download?force=true",
      alt: "Nature Scene 10",
    },
    {
      id: 11,
      src: "https://unsplash.com/photos/JmuyB_LibRo/download?force=true",
      alt: "Nature Scene 11",
    },
    {
      id: 12,
      src: "https://unsplash.com/photos/1OtUkD_8svc/download?force=true",
      alt: "Nature Scene 12",
    },
    {
      id: 13,
      src: "https://unsplash.com/photos/9wg5jCEPBsw/download?force=true",
      alt: "Nature Scene 13",
    },
    {
      id: 14,
      src: "https://unsplash.com/photos/jFCViYFYcus/download?force=true",
      alt: "Nature Scene 14",
    },
    {
      id: 15,
      src: "https://unsplash.com/photos/kTxL6le0Wgk/download?force=true",
      alt: "Nature Scene 15",
    },
    {
      id: 16,
      src: "https://unsplash.com/photos/jFCViYFYcus/download?force=true",
      alt: "Nature Scene 16",
    },
    {
      id: 17,
      src: "https://unsplash.com/photos/wQLAGv4_OYs/download?force=true",
      alt: "Nature Scene 17",
    },
    {
      id: 18,
      src: "https://unsplash.com/photos/Q1p7bh3SHj8/download?force=true",
      alt: "Nature Scene 18",
    },
    {
      id: 19,
      src: "https://unsplash.com/photos/_RBcxo9AU-U/download?force=true",
      alt: "Nature Scene 19",
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const openModal = (imageIndex) => {
    setCurrentImage(imageIndex);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const selectImage = (imageIndex) => {
    setCurrentImage(imageIndex);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Light Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openModal(index)}
            className="cursor-pointer"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-45 object-cover transition duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={closeModal}
          >
            &times;
          </button>
          <img
            src={images[currentImage].src}
            alt={images[currentImage].alt}
            className="max-h-[80vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
};
export default LightGallery;