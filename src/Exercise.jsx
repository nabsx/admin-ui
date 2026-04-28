import React from "react";
import PostCard from "./PostCard";
import postsData from "./data/postsData";

function Exercise() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
          User Posts
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {postsData.map(({ id, userId, title, body }) => (
            <PostCard
              key={id}
              id={id}
              userId={userId}
              title={title}
              body={body}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Exercise;
