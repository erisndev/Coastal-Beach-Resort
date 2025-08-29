// src/pages/NewsletterDetail.jsx
import { fetchNewsletterById } from "@/API/Api";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const NewsletterDetail = () => {
  const { id } = useParams();
  const [newsletter, setNewsletter] = useState(null);

  useEffect(() => {
    const fetchNewsletter = async () => {
      try {
        const data = await fetchNewsletterById(id); // use API helper
        setNewsletter(data);
      } catch (err) {
        console.error("Failed to fetch newsletter:", err);
      }
    };

    fetchNewsletter();
  }, [id]);

  if (!newsletter) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/newsletters"
        className="text-amber-600 hover:underline mb-6 inline-block"
      >
        ← Back to Newsletters
      </Link>

      {newsletter.image && (
        <img
          src={newsletter.image}
          alt={newsletter.title}
          className="w-full h-full object-cover rounded-lg mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{newsletter.title}</h1>
      <p className="text-gray-500 mb-6">
        {new Date(newsletter.date).toLocaleDateString()}
      </p>
      <div
        className="text-gray-700 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: newsletter.content }}
      />
    </div>
  );
};
