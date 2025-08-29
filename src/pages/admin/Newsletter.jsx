// src/pages/NewsletterAdmin.jsx
import React, { useEffect, useState } from "react";
import { Plus, Edit3, Trash2, Calendar, Eye, Image } from "lucide-react";
import {
  getNewsletters,
  createNewsletter,
  updateNewsletter,
  deleteNewsletter,
} from "../../API/Api";
import { NewsletterForm } from "../admin/components/NewsletterForm";

export const Newsletter = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [editing, setEditing] = useState(null); // newsletter being edited
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const fetchNewsletters = async () => {
    setLoading(true);
    const data = await getNewsletters();
    setNewsletters(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const handleCreate = async (data) => {
    await createNewsletter(data);
    setShowForm(false);
    fetchNewsletters();
  };

  const handleUpdate = async (id, data) => {
    await updateNewsletter(id, data);
    setEditing(null);
    fetchNewsletters();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this newsletter?")) {
      await deleteNewsletter(id);
      fetchNewsletters();
    }
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
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
            {newsletters.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Image className="w-12 h-12 text-gray-400" />
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
              newsletters.map((n) => (
                <div
                  key={n._id}
                  className="bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl border border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section */}
                    <div className="lg:w-80 h-64 lg:h-auto relative overflow-hidden">
                      {n.image ? (
                        <div className="relative h-full group">
                          <img
                            src={n.image}
                            alt={n.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                        </div>
                      ) : (
                        <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <div className="text-center">
                            <Image className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">
                              No Image
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-8">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-gray-800 mb-3 leading-tight">
                            {n.title}
                          </h2>

                          {/* Date Badge */}
                          <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                              <Calendar className="w-4 h-4" />
                              {new Date(n.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => setEditing(n)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-blue-200"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(n._id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition-all duration-200 transform hover:scale-110 shadow-lg hover:shadow-red-200"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Content Preview */}
                      <div className="text-gray-600 leading-relaxed mb-6">
                        <div
                          className="text-lg"
                          dangerouslySetInnerHTML={{
                            __html:
                              expandedId === n._id
                                ? n.content
                                : truncateText(n.content),
                          }}
                        ></div>

                        {n.content.length > 150 && (
                          <button
                            onClick={() => toggleExpanded(n._id)}
                            className="text-blue-600 hover:text-blue-700 font-semibold mt-2 flex items-center gap-1 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            {expandedId === n._id ? "Show Less" : "Read More"}
                          </button>
                        )}
                      </div>

                      {/* Stats/Meta Information */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          Created {new Date(n.date).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {n.content.length} characters
                        </div>
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
