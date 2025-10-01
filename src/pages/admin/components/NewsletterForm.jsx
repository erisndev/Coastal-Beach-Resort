import React, { useState } from "react";
import {
  X,
  Upload,
  FileText,
  Image as ImageIcon,
  Calendar,
} from "lucide-react";

export const NewsletterForm = ({ onSubmit, initialData = {}, onCancel }) => {
  // Helper functions to extract data from object or string formats
  const getImageUrl = (imageData) => {
    if (!imageData) return "";
    if (typeof imageData === "object" && imageData.url) return imageData.url;
    if (typeof imageData === "string") return imageData;
    return "";
  };

  const getPdfInfo = (pdfData) => {
    if (!pdfData) return { url: "", fileName: "" };
    if (typeof pdfData === "object") {
      return {
        url: pdfData.url || "",
        fileName: pdfData.fileName || "Existing PDF",
      };
    }
    if (typeof pdfData === "string") {
      return {
        url: pdfData,
        fileName: "Existing PDF",
      };
    }
    return { url: "", fileName: "" };
  };

  // Initialize state with proper handling of existing data
  const [title, setTitle] = useState(initialData?.title || "");
  const [publishDate, setPublishDate] = useState(() => {
    if (initialData?.publishDate) {
      return new Date(initialData.publishDate).toISOString().slice(0, 10);
    }
    return "";
  });

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(() => {
    return getImageUrl(initialData?.coverImage || initialData?.coverImageUrl);
  });
  const [existingImageUrl] = useState(() => {
    return getImageUrl(initialData?.coverImage || initialData?.coverImageUrl);
  });

  const [pdfFile, setPdfFile] = useState(null);
  const pdfInfo = getPdfInfo(initialData?.pdfUrl || initialData?.pdf);
  const [pdfFileName, setPdfFileName] = useState(pdfInfo.fileName);
  const [existingPdfUrl] = useState(pdfInfo.url);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !publishDate) {
      alert("Please fill in all required fields");
      return;
    }

    // For new newsletters, both cover image and PDF are required
    if (!initialData?._id && (!coverImageFile || !pdfFile)) {
      alert("Please upload both a cover image and PDF file");
      return;
    }

    // For editing, ensure we have either new files or existing ones
    if (initialData?._id) {
      if (!coverImageFile && !existingImageUrl) {
        alert("Cover image is required");
        return;
      }
      if (!pdfFile && !existingPdfUrl) {
        alert("PDF file is required");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Create FormData object
      const formData = new FormData();
      formData.append("title", title);
      formData.append("publishDate", publishDate);

      // Append files if they exist
      if (coverImageFile) {
        formData.append("coverImage", coverImageFile, coverImageFile.name);
      }

      if (pdfFile) {
        formData.append("pdf", pdfFile, pdfFile.name);
      }

      // Debug: Log FormData contents
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, {
            name: value.name,
            size: value.size,
            type: value.type,
          });
        } else {
          console.log(`${key}:`, value);
        }
      }

      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit newsletter: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected image file:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        e.target.value = null;
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image file size must be less than 5MB");
        e.target.value = null;
        return;
      }

      setCoverImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setCoverImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected PDF file:", {
        name: file.name,
        size: file.size,
        type: file.type,
      });

      // Validate file type
      if (
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
      ) {
        alert("Please select a PDF file");
        e.target.value = null;
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("PDF file size must be less than 10MB");
        e.target.value = null;
        return;
      }

      setPdfFile(file);
      setPdfFileName(file.name);
    }
  };

  const clearCoverImage = () => {
    setCoverImageFile(null);
    // Only clear preview if we're not editing or there's no existing image
    if (!initialData?._id || !existingImageUrl) {
      setCoverImagePreview("");
    } else {
      // Restore existing image preview when clearing new upload
      setCoverImagePreview(existingImageUrl);
    }
  };

  const clearPdf = () => {
    setPdfFile(null);
    // Restore existing PDF info when clearing new upload
    if (existingPdfUrl) {
      setPdfFileName(
        getPdfInfo(initialData?.pdfUrl || initialData?.pdf).fileName
      );
    } else {
      setPdfFileName("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm p-8 shadow-2xl rounded-3xl border border-white/20 mb-6 space-y-8"
        >
          <div className="text-center pb-6 border-b border-gray-100">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {initialData?._id ? "Edit Newsletter" : "Create Newsletter"}
            </h2>
            <p className="text-gray-600 text-lg">
              {initialData?._id
                ? "Update newsletter content"
                : "Upload newsletter content for your subscribers"}
            </p>
          </div>

          {/* Title */}
          <div className="group">
            <label className="block text-sm font-semibold mb-3 text-gray-700 transition-colors group-focus-within:text-blue-600">
              Newsletter Title <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-medium placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-100 hover:border-gray-300"
                placeholder="Enter newsletter title..."
                required
                disabled={isSubmitting}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 -z-10 transition-opacity duration-300 group-focus-within:opacity-5"></div>
            </div>
          </div>

          {/* Publish Date */}
          <div className="group">
            <label className="block text-sm font-semibold mb-3 text-gray-700 transition-colors group-focus-within:text-blue-600">
              <Calendar className="inline w-4 h-4 mr-1" />
              Publish Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-medium transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-100 hover:border-gray-300"
                required
                disabled={isSubmitting}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 -z-10 transition-opacity duration-300 group-focus-within:opacity-5"></div>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div className="group">
            <label className="block text-sm font-semibold mb-3 text-gray-700 transition-colors group-focus-within:text-blue-600">
              <ImageIcon className="inline w-4 h-4 mr-1" />
              Cover Image <span className="text-red-500">*</span>
              <span className="text-gray-400 font-normal ml-2">
                (JPG, PNG, max 5MB)
              </span>
            </label>

            {coverImagePreview ? (
              <div className="relative w-full">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={coverImagePreview}
                    alt="Cover Preview"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="20"%3EImage Error%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <button
                    type="button"
                    onClick={clearCoverImage}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 transform hover:scale-110 shadow-lg"
                    disabled={isSubmitting}
                    title={
                      coverImageFile
                        ? "Remove new image"
                        : existingImageUrl
                        ? "Upload new image"
                        : "Remove image"
                    }
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {coverImageFile && (
                  <div className="mt-3 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border">
                    <span className="font-medium">New Image:</span>{" "}
                    {coverImageFile.name} (
                    {(coverImageFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
                {!coverImageFile && existingImageUrl && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Current image:</strong> Click the X button to
                      upload a new image
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleCoverImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isSubmitting}
                />
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4 transition-colors hover:text-blue-500" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    Upload Cover Image
                  </p>
                  <p className="text-sm text-gray-400">
                    Click to browse or drag and drop
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* PDF Upload */}
          <div className="group">
            <label className="block text-sm font-semibold mb-3 text-gray-700 transition-colors group-focus-within:text-blue-600">
              <FileText className="inline w-4 h-4 mr-1" />
              Newsletter PDF <span className="text-red-500">*</span>
              <span className="text-gray-400 font-normal ml-2">
                (PDF, max 10MB)
              </span>
            </label>

            {pdfFileName || existingPdfUrl ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-800">{pdfFileName}</p>
                      {pdfFile && (
                        <p className="text-sm text-gray-600">
                          New PDF: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      )}
                      {!pdfFile && existingPdfUrl && (
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-gray-600">Current PDF</p>
                          <a
                            href={existingPdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearPdf}
                    className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 transform hover:scale-110 shadow-lg"
                    disabled={isSubmitting}
                    title={
                      pdfFile
                        ? "Remove new PDF"
                        : existingPdfUrl
                        ? "Upload new PDF"
                        : "Remove PDF"
                    }
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {!pdfFile && existingPdfUrl && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Current PDF:</strong> Click the X button to upload
                      a new PDF
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  disabled={isSubmitting}
                />
                <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4 transition-colors hover:text-blue-500" />
                  <p className="text-lg font-medium text-gray-600 mb-2">
                    Upload Newsletter PDF
                  </p>
                  <p className="text-sm text-gray-400">
                    Click to browse or drag and drop
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200 focus:scale-[0.98] focus:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Uploading...
                </span>
              ) : initialData?._id ? (
                "Update Newsletter"
              ) : (
                "Create Newsletter"
              )}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="bg-gray-100 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:bg-gray-200 focus:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
