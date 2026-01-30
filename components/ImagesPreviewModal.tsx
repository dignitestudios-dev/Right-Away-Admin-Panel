"use client";

import { X } from "lucide-react";

interface ImagePreviewModalProps {
  image: string;
  title?: string;
  onClose: () => void;
}

export default function ImagePreviewModal({
  image,
  title,
  onClose,
}: ImagePreviewModalProps) {
  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white hover:bg-white/20 rounded-full p-2 transition"
      >
        <X size={24} />
      </button>

      {/* Title */}
      {title && (
        <div className="absolute top-5 left-5 text-white text-sm font-medium">
          {title}
        </div>
      )}

      {/* Image */}
      <img
        src={image}
        alt={title || "Preview"}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
      />
    </div>
  );
}
