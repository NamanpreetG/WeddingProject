"use client";

import { useState, useRef } from "react";

type Step = "code" | "upload" | "success";

export default function PhotoUpload({ onUploaded }: { onUploaded?: () => void }) {
  const [step, setStep] = useState<Step>("code");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function verifyCode() {
    setVerifying(true);
    setCodeError("");
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const { valid } = await res.json();
      if (valid) {
        setStep("upload");
      } else {
        setCodeError("Incorrect code. Please try again.");
      }
    } catch {
      setCodeError("Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadError("");

    try {
      const uploads = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ?? "wedding_shared");
        formData.append("folder", "wedding-shared");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: formData }
        );
        if (!res.ok) throw new Error("Upload failed");
        return res.json();
      });

      await Promise.all(uploads);
      setStep("success");
      onUploaded?.();
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  const inputClass = "w-full bg-white/70 border border-gold/20 rounded-sm px-4 py-3 font-sans text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-colors outline-none";

  return (
    <div className="bg-white/70 backdrop-blur-sm border border-gold/15 rounded-sm p-8 md:p-10 shadow-sm max-w-lg mx-auto">
      {step === "code" && (
        <div className="space-y-5">
          <div className="text-center mb-6">
            <p className="font-serif text-charcoal/60 text-sm">
              Enter the code shared with you to upload photos
            </p>
          </div>
          <input
            type="text"
            placeholder="Enter your code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && verifyCode()}
            className={inputClass}
          />
          {codeError && (
            <p className="text-red-500 text-sm font-sans">{codeError}</p>
          )}
          <button
            onClick={verifyCode}
            disabled={verifying || !code}
            className="w-full py-3 bg-gold text-ivory font-serif tracking-widest uppercase text-sm hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-sm"
          >
            {verifying ? "Verifying..." : "Continue ✦"}
          </button>
        </div>
      )}

      {step === "upload" && (
        <div className="space-y-5">
          <div className="text-center mb-4">
            <p className="font-serif text-charcoal/60 text-sm">
              Select photos to share with Karminder &amp; Simranjit
            </p>
          </div>

          {/* Drop zone */}
          <div
            className={`border-2 border-dashed rounded-sm p-10 text-center cursor-pointer transition-colors ${
              dragOver ? "border-gold bg-gold/5" : "border-gold/30 hover:border-gold/60"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); uploadFiles(e.dataTransfer.files); }}
          >
            <div className="text-3xl mb-3">📷</div>
            <p className="font-serif text-charcoal/60 text-sm">
              Drag &amp; drop photos here or <span className="text-gold">click to browse</span>
            </p>
            <p className="font-sans text-xs text-charcoal/40 mt-2">
              JPG, PNG, HEIC supported · Multiple photos allowed
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => uploadFiles(e.target.files)}
            />
          </div>

          {uploading && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 font-serif text-sm text-charcoal/60">
                <svg className="animate-spin w-4 h-4 text-gold" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Uploading your photos...
              </div>
            </div>
          )}

          {uploadError && (
            <p className="text-red-500 text-sm font-sans text-center">{uploadError}</p>
          )}
        </div>
      )}

      {step === "success" && (
        <div className="text-center space-y-4">
          <div className="text-4xl">🎉</div>
          <p className="font-script text-3xl text-gold">Thank You!</p>
          <p className="font-serif text-charcoal/60 text-sm">
            Your photos have been shared. They will appear in the gallery shortly.
          </p>
          <button
            onClick={() => { setStep("upload"); setCode(""); }}
            className="mt-4 font-serif text-sm text-gold border-b border-gold/30 hover:border-gold transition-colors pb-px"
          >
            Upload more photos
          </button>
        </div>
      )}
    </div>
  );
}
