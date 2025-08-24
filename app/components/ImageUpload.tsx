
"use client";

import { useState } from "react";

export function ImageUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Mock file upload
      const fileName = e.dataTransfer.files[0].name;
      setUploadedFiles(prev => [...prev, fileName]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Mock file upload
      const fileName = e.target.files[0].name;
      setUploadedFiles(prev => [...prev, fileName]);
    }
  };

  return (
    <div className="space-y-sm">
      <div
        className={`border-2 border-dashed rounded-lg p-lg text-center transition-colors duration-200 ${
          dragActive
            ? "border-accent bg-accent/5"
            : "border-neutral-3/30 hover:border-accent/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="space-y-sm">
          <div className="text-4xl">📷</div>
          <p className="text-neutral-3">
            Drag and drop images here, or{" "}
            <label className="text-accent cursor-pointer underline">
              browse files
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
            </label>
          </p>
          <p className="text-xs text-neutral-3">
            Supports JPEG, PNG, WebP (max 5MB each)
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-xs">
          <p className="text-sm font-medium">Uploaded Files:</p>
          {uploadedFiles.map((fileName, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-accent/10 rounded-md p-sm"
            >
              <span className="text-sm text-accent">{fileName}</span>
              <button
                onClick={() =>
                  setUploadedFiles(prev => prev.filter((_, i) => i !== index))
                }
                className="text-neutral-3 hover:text-red-500 transition-colors duration-200"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
