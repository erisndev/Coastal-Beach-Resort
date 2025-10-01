// src/pages/NewsletterDetail.jsx
import { fetchNewsletterById } from "@/API/Api";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, FileText, Share2, Download, Eye } from "lucide-react";

export const NewsletterDetail = () => {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        setLoading(true);
        const data = await fetchNewsletterById(id);
        setNewsletter(data);
      } catch (err) {
        console.error("Failed to fetch newsletter:", err);
        setError("Failed to load newsletter");
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletter();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: newsletter.title,
          text: `Check out this newsletter: ${newsletter.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mb-4"></div>
          <p className="text-slate-600 font-medium">Loading newsletter...</p>
        </div>
      </div>
    );
  }

  if (error || !newsletter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            {error || "Newsletter Not Found"}
          </h2>
          <Link
            to="/newsletters"
            className="text-amber-600 hover:text-amber-700 font-medium mt-4 inline-block"
          >
            ← Back to Newsletters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section with Navigation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-red-500/10"></div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          {/* Navigation Bar */}
          <nav className="flex items-center justify-between mb-8">
            <Link
              to="/newsletters"
              className="group flex items-center gap-2 text-slate-700 hover:text-amber-600 transition-all duration-200 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md border border-white/20"
            >
              <ArrowLeft
                size={18}
                className="transition-transform group-hover:-translate-x-1"
              />
              <span className="font-medium">Back to Newsletters</span>
            </Link>
          </nav>

          {/* Cover Image */}
          {newsletter.coverImage && (
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <img
                src={newsletter.coverImage}
                alt={newsletter.title}
                className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* PDF Badge on Image */}
              {newsletter.pdfUrl && (
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-gray-800">PDF Available</span>
                </div>
              )}
            </div>
          )}

          {/* Article Header */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Calendar size={16} />
                <span>
                  {new Date(newsletter.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {newsletter.pdfUrl && (
                <a
                  href={newsletter.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-100/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-green-200/20 hover:bg-green-200/80 transition-colors"
                >
                  <FileText size={16} className="text-green-700" />
                  <span className="text-green-700 font-medium">View PDF</span>
                </a>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text">
              {newsletter.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <article className="bg-white rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* PDF Viewer/Download Section */}
          {newsletter.pdfUrl && (
            <div className="p-8 sm:p-12 border-b border-slate-200">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-1">
                        Newsletter PDF
                      </h3>
                      <p className="text-slate-600">
                        Download or view the full newsletter document
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <a
                      href={newsletter.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-gray-50 text-slate-700 border border-slate-300 px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
                    >
                      <Eye size={18} />
                      View PDF
                    </a>
                    <a
                      href={newsletter.pdfUrl}
                      download
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                    >
                      <Download size={18} />
                      Download
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Newsletter Description */}
          {newsletter.description && (
            <div className="p-8 sm:p-12">
              <p className="text-lg text-slate-700 leading-relaxed">
                {newsletter.description}
              </p>
            </div>
          )}

          {/* Article Footer */}
          <div className="border-t border-slate-200 bg-slate-50/50 p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Stay Updated
                </h3>
                <p className="text-slate-600">
                  Don't miss our future newsletters and updates
                </p>
              </div>

              <div className="flex items-center gap-3">
                {newsletter.pdfUrl && (
                  <a
                    href={newsletter.pdfUrl}
                    download
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <Download size={18} />
                    Download PDF
                  </a>
                )}
                
                <button
                  onClick={handleShare}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                  <Share2 size={18} />
                  Share
                </button>

                <Link
                  to="/newsletters"
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  All Newsletters
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Floating Action Buttons for Mobile */}
        <div className="fixed bottom-6 right-6 sm:hidden flex flex-col gap-3">
          {newsletter.pdfUrl && (
            <a
              href={newsletter.pdfUrl}
              download
              className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
            >
              <Download size={20} />
            </a>
          )}
          <button
            onClick={handleShare}
            className="bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
