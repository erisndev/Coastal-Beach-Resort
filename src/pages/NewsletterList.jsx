// src/pages/NewsletterList.jsx
import React, { useEffect, useState } from "react";
import { Calendar, Search, Filter, BookOpen, FileText } from "lucide-react";
import { getNewsletters } from "@/API/Api";

export const NewsletterList = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [filteredNewsletters, setFilteredNewsletters] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setLoading(true);
        const response = await getNewsletters();
        console.log("Newsletter response:", response);

        // Handle the API response structure
        let newslettersArray = [];

        if (response && response.success && response.data) {
          if (Array.isArray(response.data.newsletters)) {
            newslettersArray = response.data.newsletters;
          } else if (Array.isArray(response.data)) {
            newslettersArray = response.data;
          }
        } else if (Array.isArray(response)) {
          newslettersArray = response;
        }

        setNewsletters(newslettersArray);
        setFilteredNewsletters(newslettersArray);
      } catch (err) {
        console.error("Failed to fetch newsletters:", err);
        setNewsletters([]);
        setFilteredNewsletters([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsletters();
  }, []);

  const handleReadNewsletter = (newsletter) => {
    // Get the PDF URL from the newsletter object
    let pdfUrl = null;

    if (newsletter.pdfUrl) {
      if (typeof newsletter.pdfUrl === "object" && newsletter.pdfUrl.url) {
        pdfUrl = newsletter.pdfUrl.url;
      } else if (typeof newsletter.pdfUrl === "string") {
        pdfUrl = newsletter.pdfUrl;
      }
    } else if (newsletter.pdf) {
      if (typeof newsletter.pdf === "object" && newsletter.pdf.url) {
        pdfUrl = newsletter.pdf.url;
      } else if (typeof newsletter.pdf === "string") {
        pdfUrl = newsletter.pdf;
      }
    }

    if (pdfUrl) {
      // Open PDF in new tab
      window.open(pdfUrl, "_blank");
    } else {
      alert("PDF not available for this newsletter");
    }
  };

  const getImageUrl = (newsletter) => {
    const imageField =
      newsletter.coverImage || newsletter.coverImageUrl || newsletter.image;
    if (imageField) {
      if (typeof imageField === "object" && imageField.url) {
        return imageField.url;
      } else if (typeof imageField === "string") {
        return imageField;
      }
    }
    return null;
  };

  useEffect(() => {
    let filtered = newsletters;

    if (searchTerm) {
      filtered = filtered.filter((n) =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (monthFilter) {
      filtered = filtered.filter(
        (n) => new Date(n.publishDate).getMonth() + 1 === parseInt(monthFilter)
      );
    }

    if (yearFilter) {
      filtered = filtered.filter(
        (n) => new Date(n.publishDate).getFullYear() === parseInt(yearFilter)
      );
    }

    setFilteredNewsletters(filtered);
    setVisibleCount(6);
  }, [searchTerm, monthFilter, yearFilter, newsletters]);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 6);
      setIsLoadingMore(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const allLoaded = visibleCount >= filteredNewsletters.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url("/test.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="text-center z-10 px-4">
          <h1 className="text-6xl md:text-8xl font-extralight text-white mb-6 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_0.5s_forwards]">
            Resort
          </h1>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-wider opacity-0 animate-[fadeInUp_1.5s_ease-out_1s_forwards]">
            Newsletters
          </h1>
          <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_1.5s_ease-out_1.5s_forwards]">
            Stay updated with the latest news, events, and exciting happenings
            at our coastal retreat.
          </p>
          <div className="w-24 h-px bg-white mx-auto mt-8 opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50"></div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters Section */}
        <section className="py-12 -mt-20 relative z-10">
          <div className="bg-white rounded-3xl shadow-xl p-8 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search newsletters by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-700 bg-slate-50 hover:bg-white"
                />
              </div>

              {/* Month Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  value={monthFilter}
                  onChange={(e) => setMonthFilter(e.target.value)}
                  className="pl-12 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-700 bg-slate-50 hover:bg-white appearance-none cursor-pointer min-w-[160px]"
                >
                  <option value="">All Months</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={`month-${i}`} value={i + 1}>
                      {new Date(0, i).toLocaleString("default", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="pl-12 pr-8 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 text-slate-700 bg-slate-50 hover:bg-white appearance-none cursor-pointer min-w-[140px]"
                >
                  <option value="">All Years</option>
                  {[
                    ...new Set(
                      newsletters.map((n) =>
                        new Date(n.publishDate).getFullYear()
                      )
                    ),
                  ].map((year, index) => (
                    <option key={`year-${year}-${index}`} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletters Section */}
        <section className="py-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="inline-block w-12 h-12 border-4 border-amber-600/30 border-t-amber-600 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600 text-lg font-light">
                Loading newsletters...
              </p>
            </div>
          ) : filteredNewsletters.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
              <div className="mb-8 w-40 h-40 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-amber-600 animate-pulse" />
              </div>

              <h2 className="text-3xl md:text-4xl font-light text-slate-800 mb-4 tracking-wide">
                No Newsletters Found
              </h2>
              <p className="text-slate-600 text-center max-w-md leading-relaxed font-light">
                {newsletters.length === 0
                  ? "We haven't published any newsletters yet. Check back soon for exciting updates!"
                  : "No newsletters match your current filters. Try adjusting your search criteria."}
              </p>
              {(searchTerm || monthFilter || yearFilter) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setMonthFilter("");
                    setYearFilter("");
                  }}
                  className="mt-6 text-amber-600 hover:text-amber-700 font-medium transition-colors duration-300 underline underline-offset-2"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-slate-600 text-lg font-light">
                  Showing{" "}
                  <span className="font-medium text-slate-800">
                    {Math.min(visibleCount, filteredNewsletters.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-800">
                    {filteredNewsletters.length}
                  </span>{" "}
                  newsletter{filteredNewsletters.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {filteredNewsletters
                  .slice(0, visibleCount)
                  .map((newsletter, index) => {
                    const imageUrl = getImageUrl(newsletter);

                    return (
                      <div
                        key={`newsletter-${newsletter._id}-${index}`}
                        className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white
                        ${
                          index >= visibleCount - 6
                            ? "opacity-0 animate-[fadeInUp_0.8s_ease-out_forwards]"
                            : ""
                        }`}
                        style={{ animationDelay: `${(index % 3) * 100}ms` }}
                      >
                        {/* Cover Image */}
                        <div className="relative overflow-hidden h-64">
                          {imageUrl ? (
                            <>
                              <img
                                src={imageUrl}
                                alt={newsletter.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="20"%3ENo Image%3C/text%3E%3C/svg%3E';
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                              <BookOpen className="w-16 h-16 text-amber-600 opacity-50" />
                            </div>
                          )}

                          {/* PDF Badge */}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                            <FileText className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-gray-800">
                              PDF
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col">
                          {/* Title */}
                          <h2 className="text-xl font-semibold text-slate-800 mb-3 leading-tight group-hover:text-amber-700 transition-colors duration-300 line-clamp-2">
                            {newsletter.title}
                          </h2>

                          {/* Date */}
                          <div className="flex items-center text-sm text-slate-500 mb-4">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(newsletter.publishDate)}
                          </div>

                          {/* Read Newsletter Button */}
                          <button
                            onClick={() => handleReadNewsletter(newsletter)}
                            className="w-full cursor-pointer bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <FileText className="w-5 h-5" />
                            Read Newsletter
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {!allLoaded && (
                <div className="flex justify-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-12 py-4 rounded-full text-lg font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoadingMore ? (
                      <>
                        <div className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Newsletters
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
