// src/pages/NewsletterDetail.jsx
import { fetchNewsletterById } from "@/API/Api";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Share2, Bookmark } from "lucide-react";

export const NewsletterDetail = () => {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState(null);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const data = await fetchNewsletterById(id);
        setNewsletter(data);

        // Calculate reading time (average 200 words per minute)
        if (data.content) {
          const wordCount = data.content
            .replace(/<[^>]*>/g, "")
            .split(/\s+/).length;
          setReadingTime(Math.ceil(wordCount / 200));
        }
      } catch (err) {
        console.error("Failed to fetch newsletter:", err);
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

  if (!newsletter) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mb-4"></div>
          <p className="text-slate-600 font-medium">Loading newsletter...</p>
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

          {/* Featured Image */}
          {newsletter.image && (
            <div className="relative mb-8 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
              <img
                src={newsletter.image}
                alt={newsletter.title}
                className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          )}

          {/* Article Header */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                <Calendar size={16} />
                <span>
                  {new Date(newsletter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {readingTime > 0 && (
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                  <Clock size={16} />
                  <span>{readingTime} min read</span>
                </div>
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
          <div className="p-8 sm:p-12">
            <div
              className="prose prose-lg prose-slate max-w-none
                         prose-headings:text-slate-900 prose-headings:font-bold
                         prose-h1:text-3xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:leading-tight
                         prose-h2:text-2xl prose-h2:mb-4 prose-h2:mt-8 prose-h2:text-slate-800
                         prose-h3:text-xl prose-h3:mb-3 prose-h3:mt-6 prose-h3:text-slate-800
                         prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
                         prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                         prose-strong:text-slate-900 prose-strong:font-semibold
                         prose-ul:my-6 prose-li:my-2 prose-li:text-slate-700
                         prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:bg-amber-50/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:text-slate-800
                         prose-code:text-amber-700 prose-code:bg-amber-50 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-medium prose-code:text-sm
                         prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl prose-pre:border-0
                         prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: newsletter.content }}
            />
          </div>

          {/* Article Footer */}
          <div className="border-t border-slate-200 bg-slate-50/50 p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Enjoyed this newsletter?
                </h3>
                <p className="text-slate-600">
                  Share it with others or save it for later reading.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Share Article
                </button>

                <Link
                  to="/newsletters"
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  More Newsletters
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Floating Action Button for Mobile */}
        <div className="fixed bottom-6 right-6 sm:hidden">
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
