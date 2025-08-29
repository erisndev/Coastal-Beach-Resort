import React, { useRef, useState } from "react";
import { X, Upload } from "lucide-react";
import ReactQuill from "react-quill";

export const NewsletterForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [date, setDate] = useState(
    initialData?.date ? initialData.date.slice(0, 10) : ""
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [image, setImage] = useState(initialData?.image || "");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(initialData?.image || "");
  const quillRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const editor = quillRef.current.getEditor(); // get Quill instance
    const htmlContent = editor.root.innerHTML; // get HTML content

    onSubmit({
      title,
      date,
      content: htmlContent, // save proper HTML
      image: imageFile || image,
      imageFile,
    });
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
      setImage(""); // clear URL if file selected
    }
  };

  const handleImageUrlChange = (value) => {
    setImage(value);
    setImagePreview(value);
    if (value) setImageFile(null);
  };

  const clearImage = () => {
    setImage("");
    setImageFile(null);
    setImagePreview("");
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "code-block",
    "link",
    "image",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm p-8 shadow-2xl rounded-3xl border border-white/20 mb-6 space-y-8"
        >
          <div className="text-center pb-6 border-b border-gray-100">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {initialData?._id ? "Edit Newsletter" : "New Newsletter"}
            </h2>
            <p className="text-gray-600 text-lg">
              Create engaging content for your audience
            </p>
          </div>

          {/* Title */}
          <div className="group">
            <label className="block text-sm font-semibold mb-3 text-gray-700 transition-colors group-focus-within:text-blue-600">
              Newsletter Title
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-medium placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-100 hover:border-gray-300"
                placeholder="Enter an engaging title..."
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 -z-10 transition-opacity duration-300 group-focus-within:opacity-5"></div>
            </div>
          </div>

          {/* Date */}
          <div className="group">
            <label className="block text-sm font-semibold mb-3 text-gray-700 transition-colors group-focus-within:text-blue-600">
              Publication Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-medium transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-100 hover:border-gray-300"
                required
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 -z-10 transition-opacity duration-300 group-focus-within:opacity-5"></div>
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Newsletter Content
            </label>
            <ReactQuill
              theme="snow"
              ref={quillRef} // forward ref
              value={content}
              onChange={setContent}
              modules={quillModules}
              formats={quillFormats}
              className="bg-white rounded-xl "
              placeholder="Write your newsletter content here..."
            />
          </div>

          {/* Image Upload */}
          <div className="group">
            <label className="block text-sm font-semibold mb-3 text-gray-700 transition-colors group-focus-within:text-blue-600">
              Featured Image{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>

            {imagePreview ? (
              <div className="relative w-full max-w-md">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 transform hover:scale-110 shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {imageFile && (
                  <div className="mt-3 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm border">
                    <span className="font-medium">File:</span> {imageFile.name}{" "}
                    ({(imageFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4 transition-colors hover:text-blue-500" />
                    <p className="text-lg font-medium text-gray-600 mb-2">
                      Upload from your device
                    </p>
                    <p className="text-sm text-gray-400">
                      Drag and drop or click to browse
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative bg-white px-4">
                    <span className="text-sm text-gray-500 font-medium">
                      OR
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 group">
                  <div className="flex-1 relative">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageUrlChange(e.target.value)}
                      placeholder="Paste image URL here..."
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-4 text-lg font-medium placeholder-gray-400 transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-100 hover:border-gray-300"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 -z-10 transition-opacity duration-300 group-focus-within:opacity-5"></div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200 transition-colors group-focus-within:border-blue-300 group-focus-within:bg-blue-50">
                    <Upload className="w-6 h-6 text-gray-500 transition-colors group-focus-within:text-blue-500" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-200 focus:scale-[0.98] focus:shadow-lg"
            >
              {initialData?._id ? "Update Newsletter" : "Save Newsletter"}
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="bg-gray-100 text-gray-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:bg-gray-200 focus:scale-[0.98]"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
