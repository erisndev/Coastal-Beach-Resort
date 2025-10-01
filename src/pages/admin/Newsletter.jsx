// src/pages/NewsletterAdmin.jsx
import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Calendar,
  FileText,
  Image,
  Download,
  Eye,
  X,
} from "lucide-react";
import {
  getNewsletters,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "../../API/Api";
import { NewsletterForm } from "../admin/components/NewsletterForm";

export const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNewsletters = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getNewsletters();
      console.log("Fetched newsletters response:", response);
      
      // Handle the API response structure
      let newslettersArray = [];
      
      if (response && response.success && response.data) {
        // API returns { success: true, data: { newsletters: [...], totalPages, etc } }
        if (Array.isArray(response.data.newsletters)) {
          newslettersArray = response.data.newsletters;
          console.log("Found newsletters in response.data.newsletters:", newslettersArray);
        } else if (Array.isArray(response.data)) {
          // In case data itself is the array
          newslettersArray = response.data;
          console.log("Found newsletters in response.data:", newslettersArray);
        } else {
          console.log("Response data structure:", response.data);
          // Try to find any array property in data
          const possibleArrayKeys = Object.keys(response.data).filter(
            key => Array.isArray(response.data[key])
          );
          if (possibleArrayKeys.length > 0) {
            newslettersArray = response.data[possibleArrayKeys[0]];
            console.log(`Found newsletters in response.data.${possibleArrayKeys[0]}:`, newslettersArray);
          }
        }
      } else if (Array.isArray(response)) {
        // Direct array response
        newslettersArray = response;
        console.log("Response is directly an array:", newslettersArray);
      } else if (response && Array.isArray(response.newsletters)) {
        // Response has newsletters at root level
        newslettersArray = response.newsletters;
        console.log("Found newsletters in response.newsletters:", newslettersArray);
      }
      
      setNewsletters(newslettersArray);
      
      if (newslettersArray.length === 0) {
        console.log("No newsletters found in response");
      } else {
        console.log("Newsletter data structure:", newslettersArray[0]);
      }
    } catch (err) {
      console.error("Error fetching newsletters:", err);
      setError("Failed to load newsletters");
      setNewsletters([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleCreate = async (formData) => {
    try {
      console.log("Submitting newsletter with FormData:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(
            `${key}: File - ${value.name} (${value.size} bytes, ${value.type})`
          );
        } else {
          console.log(`${key}: ${value}`);
        }
      }

      const result = await createNewsletter(formData);
      console.log("Newsletter created successfully:", result);
      setShowForm(false);
      fetchNewsletters();
    } catch (err) {
      console.error("Error creating newsletter:", err);
      alert("Failed to create newsletter: " + err.message);
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await updateNewsletter(id, formData);
      setEditing(null);
      fetchNewsletters();
    } catch (err) {
      console.error("Error updating newsletter:", err);
      alert("Failed to update newsletter: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this newsletter?")) {
      try {
        await deleteNewsletter(id);
        fetchNewsletters();
      } catch (err) {
        console.error("Error deleting newsletter:", err);
        alert("Failed to delete newsletter: " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Newsletter Admin
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your newsletter content and engage with your audience through
            compelling stories
          </p>
        </div>

        {/* Form */}
        {showForm && !editing && (
          <NewsletterForm
            onSubmit={handleCreate}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editing && (
          <NewsletterForm
            initialData={editing}
            onSubmit={(data) => handleUpdate(editing._id, data)}
            onCancel={() => setEditing(null)}
          />
        )}

        {/* Add Button */}
        {!showForm && !editing && (
          <div className="text-center mb-10">
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-200 flex items-center gap-3 mx-auto"
            >
              <Plus className="w-6 h-6" />
              Create New Newsletter
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-4">Loading newsletters...</p>
          </div>
        ) : (
          /* Newsletter List */
          <div className="grid gap-8">
            {error ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <X className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  Error Loading Newsletters
                </h3>
                <p className="text-gray-500 mb-6">{error}</p>
                <button
                  onClick={fetchNewsletters}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            ) : !newsletters || newsletters.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  No newsletters yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first newsletter to get started
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Create First Newsletter
                </button>
              </div>
            ) : (
              newsletters && Array.isArray(newsletters) && newsletters.map((n) => (
                <div
                  key={n._id}
                  className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Cover Image Section */}
                    <div className="lg:w-80 h-64 lg:h-auto relative overflow-hidden">
                      {(() => {
                        // Handle both object format {url: "...", fileName: "..."} and string format
                        let imageUrl = null;
                        
                        // Check multiple possible field names for the image
                        const imageField = n.coverImage || n.coverImageUrl || n.image || n.imageUrl || n.cover_image;
                        
                        if (imageField) {
                          // If it's an object with a url property, use that
                          if (typeof imageField === 'object' && imageField.url) {
                            imageUrl = imageField.url;
                          } 
                          // If it's a string, use it directly
                          else if (typeof imageField === 'string') {
                            imageUrl = imageField;
                          }
                        }
                        
                        if (imageUrl) {
                          return (
                            <div className="relative h-full group">
                              <img
                                src={imageUrl}
                                alt={n.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                  console.error(`Failed to load image for ${n.title}:`, imageUrl);
                                  e.target.onerror = null;
                                  // Replace with placeholder
                                  e.target.parentElement.innerHTML = `
                                    <div class="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                      <div class="text-center">
                                        <svg class="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <p class="text-gray-500 font-medium">Image Load Failed</p>
                                      </div>
                                    </div>
                                  `;
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                            </div>
                          );
                        } else {
                          return (
                            <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <div className="text-center">
                                <Image className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-500 font-medium">
                                  No Cover Image
                                </p>
                              </div>
                            </div>
                          );
                        }
                      })()}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                            {n.title}
                          </h2>

                          {/* Date and PDF Badges */}
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              <Calendar className="w-4 h-4" />
                              {new Date(n.publishDate).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </div>

                            {n.pdfUrl && (
                              <a
                                href={n.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
                              >
                                <FileText className="w-4 h-4" />
                                PDF Available
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 ml-4">
                          {n.pdfUrl && (
                            <a
                              href={n.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-green-200"
                              title="Download PDF"
                            >
                              <Download className="w-5 h-5" />
                            </a>
                          )}
                          <button
                            onClick={() => setEditing(n)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-blue-200"
                            title="Edit Newsletter"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(n._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-red-200"
                            title="Delete Newsletter"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Newsletter Description if available */}
                      {n.description && (
                        <div className="text-gray-600 leading-relaxed mb-4">
                          <p className="text-base">{n.description}</p>
                        </div>
                      )}

                      {/* Stats/Meta Information */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          Published{" "}
                          {new Date(n.publishDate).toLocaleDateString()}
                        </div>
                        {n.pdfUrl && (
                          <a
                            href={n.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" />
                            View PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
