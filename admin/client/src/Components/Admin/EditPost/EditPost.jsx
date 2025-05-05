import React, { useState, useCallback } from "react";
import "./EditPost.css";
import { toast } from "react-toastify";
const EditPost = ({ post, setIsEdit }) => {
  const [postLikeCommentShareState, setPostLikeCommentShareState] = useState("like");
  const [images, setImages] = useState(post?.post_images || []);
  const [dragActive, setDragActive] = useState(false);
  
  // Initialize formData with all post data
  const [formData, setFormData] = useState({
    post_name: post?.post_name || "",
    post_description: post?.post_descrition || "",
    post_images: post?.post_images || [],
    post_likes: post?.post_likes || { total_likes: 0, liked_persons: {} },
    comment: post?.comment || { total_comments: 0, commented_person: {} },
    share: post?.share || { total_share: 0, shared_person: {} }
  });

  // Initialize comments state from formData
  const [comments, setComments] = useState(formData.comment.commented_person);

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setFormData(prev => ({
      ...prev,
      post_images: newImages
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        if (file.type.match("image.*")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const newImages = [...images, event.target.result];
            setImages(newImages);
            setFormData(prev => ({
              ...prev,
              post_images: newImages
            }));
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = {...comments};
    delete updatedComments[commentId];
    setComments(updatedComments);
    
    setFormData(prev => ({
      ...prev,
      comment: {
        ...prev.comment,
        commented_person: updatedComments,
        total_comments: Object.keys(updatedComments).length
      }
    }));
  };

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files);
      files.forEach(file => {
        if (file.type.match("image.*")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const newImages = [...images, event.target.result];
            setImages(newImages);
            setFormData(prev => ({
              ...prev,
              post_images: newImages
            }));
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }, [images]);


  const handleSave = async () => {
    try {
     
      // Prepare the updated post data while preserving all original fields
      const updatedPost = {
        ...formData, // Update with form changes
        post_images: images, // Update images
        comment: {
          ...post?.comment, // Preserve original comment structure
          ...formData.comment, // Update form comment changes
          commented_person: comments, // Update comments
          total_comments: Object.keys(comments).length // Update count
        },
        // Explicitly set id if it's a new post
        id: post?.id || Date.now()
      };
  
    
      
     
      const updatedPosts = updatedPost;
  
      // Save to localStorage
      localStorage.setItem('posts', JSON.stringify(updatedPosts));
    
      toast.success("Post saved successfully!");
      
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post');
    }
  };
  

  return (
    <div className="eb-edit-post">
      <div className="eb-edit-post-topbar">
        <div>
          <button className="back-btn" onClick={() => setIsEdit(false)}>
            <i className="bx bx-chevron-left"></i>
          </button>
          <div>
            <h2>Editing: {post?.post_name}</h2>{" "}
            <p>
              Update the post details such as title, description, or images.
              Click <strong>Save</strong> to apply your changes.
            </p>
          </div>
        </div>
        <button className="save-post" onClick={handleSave}>Save</button>
      </div>

      <div className="edit-post-form">
        <div className="image-box">
          <div
            className={`image-container ${dragActive ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {images.map((image, index) => (
              <div className="image-wrapper" key={index}>
                <img src={image} alt={`post-img-${index}`} />
                <button
                  className="remove-image-btn"
                  onClick={() => handleRemoveImage(index)}
                >
                  <i className="bx bx-x"></i>
                </button>
                <input
                  type="hidden"
                  name={`post_images[${index}]`}
                  value={image}
                />
              </div>
            ))}
          </div>
          <div className="file-upload-wrapper">
            <input
              type="file"
              id="fileUpload"
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="image/*"
              multiple
            />
            <label htmlFor="fileUpload" className="upload-button">
              <i className="bx bx-upload"></i> Upload Image
            </label>
            <p className="drag-drop-text">or drag and drop images here</p>
          </div>
        </div>
        <div className="post-details">
          <div className="post-name-and-desc">
            <div className="input-fields">
              <label htmlFor="">Post Name : </label>
              <input 
                type="text" 
                name="post_name" 
                value={formData.post_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-fields">
              <label htmlFor="">Post Description : </label>
              <textarea 
                name="post_description"
                value={formData.post_description}
                onChange={handleInputChange}
              />
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
              {postLikeCommentShareState === "like" && (
                <div className="like-display-content">
                  <div className="like-display-content-title">
                    <p>People who liked this post</p>
                    <p>{formData.post_likes?.total_likes} Likes</p>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.post_likes?.liked_persons &&
                        Object.entries(formData.post_likes.liked_persons).map(
                          ([id, person], index) => (
                            <tr key={id}>
                              <td>{index + 1}</td>
                              <td>
                                <img src={person.image} alt={person.name} />
                                {person.name}
                              </td>
                              <td>{person.role}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              )}

              {postLikeCommentShareState === "comment" && (
                <div className="comment-display-content">
                  <div className="like-display-content-title">
                    <p>People who commented on this post</p>
                    <p>{Object.keys(comments).length} Comments</p>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Comment</th>
                        <th>Role</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(comments).map(([id, person], index) => (
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>
                            <img src={person.image} alt={person.name} />
                            {person.name}
                          </td>
                          <td>{person.comment}</td>
                          <td>{person.role}</td>
                          <td>
                           
                              <i   onClick={() => handleDeleteComment(id)} className='bx bx-trash trash-icon'></i>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {postLikeCommentShareState === "share" && (
                <div className="share-display-content">
                  <div className="like-display-content-title">
                    <p>People who shared this post</p>
                    <p>{formData.share?.total_share} Shares</p>
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <th>S.N</th>
                        <th>Name</th>
                        <th>Shared Via</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.share?.shared_person &&
                        Object.entries(formData.share.shared_person).map(
                          ([id, person], index) => (
                            <tr key={id}>
                              <td>{index + 1}</td>
                              <td>
                                <img src={person.image} alt={person.name} />
                                {person.name}
                              </td>
                              <td>{person.shared_via}</td>
                              <td>{person.role}</td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;