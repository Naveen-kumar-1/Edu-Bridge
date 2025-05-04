import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton"; // If using react-loading-skeleton package
import "./Posts.css";
import { posts } from "../../../assets/data";

const Posts = () => {
  const [postCurrentPage, setPostCurrentPage] = useState(1);
  const postItemPerPage = 8;
  const startingIndex = (postCurrentPage - 1) * postItemPerPage;
  const endingIndex = startingIndex + postItemPerPage;
  const totalPages = Math.ceil(posts.length / postItemPerPage);
  const currentPost = posts.slice(startingIndex, endingIndex);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating loading state for posts
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  }, []);

  return (
    <div className="eb-posts">
      <div className="eb-posts-topbar">
        <div className="eb-posts-topbar-left">
          <h2>Add your Memories</h2>
          <p>Share your sweet memories with your staff & Students</p>
        </div>

        <div className="eb-posts-topbar-right">
          <button>
            <i className="bx bx-image-add"></i>Add New Post
          </button>
        </div>
      </div>

      <div className="eb-post-items">
      {isLoading
  ? Array(8).fill().map((_, index) => (
      <div className="skeleton-post" key={index}>
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text" style={{ width: "80%" }}></div>

        <div className="skeleton-img-grid">
          {[...Array(4)].map((_, i) => (
            <div className="skeleton skeleton-img" key={i}></div>
          ))}
        </div>

        <div className="skeleton-btns">
          <div className="skeleton-btns-like-comment-share">
          <div className="skeleton skeleton-btn" style={{width:'40px'}}></div>
          <div className="skeleton skeleton-btn" style={{width:'40px'}}></div>
          <div className="skeleton skeleton-btn" style={{width:'40px'}}></div>
          </div>
          <div className="skeleton skeleton-btn" style={{ width: "100px" }}></div>
        </div>
      </div>
    ))
          : currentPost.map((post, index) => (
              <div className="eb-single-post" key={index}>
                <h2>{post.post_name}</h2>
                <p>
                  {post.post_descrition.length > 40
                    ? post.post_descrition.slice(0, 40) + "..."
                    : post.post_descrition}
                </p>

                <div className="eb-post-images">
                  {post.post_images.slice(0, 4).map((img, i) => (
                    <div className="image-wrapper" key={i}>
                      <img src={img} alt={`post-${index}-img-${i}`} />
                    </div>
                  ))}
                </div>

                <div className="eb-post-edit-button">
                  <div>
                    <p>
                      <i className="bx bx-heart"></i>12
                    </p>
                    <p>
                      <i className="bx bx-message-rounded-dots"></i>8
                    </p>
                    <p>
                      <i className="bx bx-share"></i>5
                    </p>
                  </div>
                  <button>
                    <i className="bx bxs-edit-alt"></i>Edit Post
                  </button>
                </div>
              </div>
            ))}
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => setPostCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={postCurrentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, pageIndex) => (
          <button
            key={pageIndex}
            onClick={() => setPostCurrentPage(pageIndex + 1)}
            className={postCurrentPage === pageIndex + 1 ? "active-page" : ""}
          >
            {pageIndex + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setPostCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={postCurrentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;
