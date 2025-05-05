import React, { useState } from "react";
import "./EditPost.css";
const EditPost = ({ post, setIsEdit }) => {
  const [postLikeCommentShareState, setPostLikeCommentShareState] =
    useState("like");
  // Use the `post` data here
  return (
    <div className="eb-edit-post">
      <div className="eb-edit-post-topbar">
        <div>
        <button className="back-btn" onClick={() => setIsEdit(false)}>
          <i class="bx bx-chevron-left"></i>
        </button>
        <div>
          <h2>Editing: {post?.post_name}</h2>{" "}
          <p>
            Update the post details such as title, description, or images. Click{" "}
            <strong>Save</strong> to apply your changes.
          </p>
        </div>
        </div>
        <button className="save-post">Save</button>
      </div>

      {/* Your edit form */}
      <div className="edit-post-form">
        <div className="image-box">
          <div>
            {post?.post_images.map((image, index) => (
              <img src={image} alt={`post-img-${index}`} key={index} />
            ))}
          </div>
          <div className="file-upload-wrapper">
            <input
              type="file"
              id="fileUpload"
              style={{ display: "none" }}
              onChange={(e) => console.log(e.target.files[0])}
            />
            <label htmlFor="fileUpload" className="upload-button">
              <i className="bx bx-upload"></i> Upload Image
            </label>
          </div>
        </div>
        <div className="post-details">
          <div className="post-name-and-desc">
            <div className="input-fields">
              <label htmlFor="">Post Name : </label>
              <input type="text" value={post?.post_name} />
            </div>
            <div className="input-fields">
              <label htmlFor="">Post Description : </label>
              <textarea name="" id="">
                {post?.post_descrition}
              </textarea>
            </div>
          </div>
          <div className="post-like-comment-share">
            <div className="post-like-comment-share-navbar">
              <p
                className={`like ${
                  postLikeCommentShareState === "like" ? "active" : ""
                }`}
                onClick={() => setPostLikeCommentShareState("like")}
              >
                <i className="bx bx-heart"></i>Like
              </p>

              <p
                className={`comment ${
                  postLikeCommentShareState === "comment" ? "active" : ""
                }`}
                onClick={() => setPostLikeCommentShareState("comment")}
              >
                <i className="bx bx-message-rounded-dots"></i>Comment
              </p>

              <p
                className={`share ${
                  postLikeCommentShareState === "share" ? "active" : ""
                }`}
                onClick={() => setPostLikeCommentShareState("share")}
              >
                <i className="bx bx-share"></i>Share
              </p>
            </div>
            <div className="post-like-comment-share-display-content">
              {postLikeCommentShareState === "like" && <div className="like-display-content">
                    <div className="like-display-content-title">
                    <p>People who liked this post</p>
                    <p>12Likes</p>
                    </div>
                  
                    <table>
                        <thead>
                            <tr><th>s.n</th>
                            <th>name</th>
                            <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td><img src="https://i.ibb.co/KtNnZ2B/kratos3.jpg" alt="" />Kratos</td>
                                <td>Student</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><img src="https://i.ibb.co/KtNnZ2B/kratos3.jpg" alt="" />Kratos</td>
                                <td>Student</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><img src="https://i.ibb.co/KtNnZ2B/kratos3.jpg" alt="" />Kratos</td>
                                <td>Student</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><img src="https://i.ibb.co/KtNnZ2B/kratos3.jpg" alt="" />Kratos</td>
                                <td>Student</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><img src="https://i.ibb.co/KtNnZ2B/kratos3.jpg" alt="" />Kratos</td>
                                <td>Student</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><img src="https://i.ibb.co/KtNnZ2B/kratos3.jpg" alt="" />Kratos</td>
                                <td>Student</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><img src="https://i.ibb.co/KtNnZ2B/kratos3.jpg" alt="" />Kratos</td>
                                <td>Student</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td><img src="https://i.ibb.co/KtNnZ2B/kratos3.jpg" alt="" />Kratos</td>
                                <td>Student</td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
              {postLikeCommentShareState === "comment" && <div>Comment</div>}
              {postLikeCommentShareState === "share" && <div>Share</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
