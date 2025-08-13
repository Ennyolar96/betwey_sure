import React from "react";

interface AlertBannerProps {
  message: string | null;
  onClose: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  message,
  onClose,
}) => {
  if (!message) return null;

  return (
    <div className="bg-red-500 text-white px-4 py-3 flex justify-between items-center rounded-md shadow-md">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200"
        aria-label="Close alert"
      >
        ✕
      </button>
    </div>
  );
};
