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
   console.log(updatedPost)
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
    <button
      className={`like-btn ${postLikeCommentShareState === "like" ? "active" : ""}`}
      onClick={() => setPostLikeCommentShareState("like")}
    >
      <i className="bx bx-heart"></i> Like ({formData.post_likes?.total_likes || 0})
    </button>

    <button
      className={`comment-btn ${postLikeCommentShareState === "comment" ? "active" : ""}`}
      onClick={() => setPostLikeCommentShareState("comment")}
    >
      <i className="bx bx-message-rounded-dots"></i> Comment ({Object.keys(comments).length || 0})
    </button>

    <button
      className={`share-btn ${postLikeCommentShareState === "share" ? "active" : ""}`}
      onClick={() => setPostLikeCommentShareState("share")}
    >
      <i className="bx bx-share"></i> Share ({formData.share?.total_share || 0})
    </button>
  </div>

  <div className="post-like-comment-share-display-content">
    {postLikeCommentShareState === "like" && (
      <div className="like-display-content">
        <div className="engagement-header">
          <h3>People who liked this post</h3>
          <span className="count-badge">{formData.post_likes?.total_likes || 0} Likes</span>
        </div>
        
        <div className="engagement-list-container">
          <div className="engagement-list-header">
            <span className="serial-no">#</span>
            <span className="user-info">User</span>
            <span className="user-role">Role</span>
          </div>
          
          <div className="engagement-list-scrollable">
            {formData.post_likes?.liked_persons && 
              Object.entries(formData.post_likes.liked_persons).map(([id, person], index) => (
                <div className="engagement-item" key={id}>
                  <span className="serial-no">{index + 1}</span>
                  <div className="user-info">
                    <img src={person.image} alt={person.name} className="user-avatar" />
                    <span className="user-name">{person.name}</span>
                  </div>
                  <span className="user-role">{person.role}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )}

    {postLikeCommentShareState === "comment" && (
      <div className="comment-display-content">
        <div className="engagement-header">
          <h3>Comments on this post</h3>
          <span className="count-badge">{Object.keys(comments).length || 0} Comments</span>
        </div>
        
        <div className="engagement-list-container">
          <div className="engagement-list-header">
            <span className="serial-no">#</span>
            <span className="user-info">User</span>
            <span className="comment-text">Comment</span>
            <span className="user-role">Role</span>
            <span className="action">Action</span>
          </div>
          
          <div className="engagement-list-scrollable">
            {Object.entries(comments).map(([id, person], index) => (
              <div className="engagement-item" key={id}>
                <span className="serial-no">{index + 1}</span>
                <div className="user-info">
                  <img src={person.image} alt={person.name} className="user-avatar" />
                  <span className="user-name">{person.name}</span>
                </div>
                <span className="comment-text">{person.comment}</span>
                <span className="user-role">{person.role}</span>
                <span className="action">
                  <button 
                    className="delete-btn"
                    onClick={() => handleDeleteComment(id)}
                  >
                    <i className='bx bx-trash'></i>
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}

    {postLikeCommentShareState === "share" && (
      <div className="share-display-content">
        <div className="engagement-header">
          <h3>People who shared this post</h3>
          <span className="count-badge">{formData.share?.total_share || 0} Shares</span>
        </div>
        
        <div className="engagement-list-container">
          <div className="engagement-list-header">
            <span className="serial-no">#</span>
            <span className="user-info">User</span>
            <span className="shared-via">Shared Via</span>
            <span className="user-role">Role</span>
          </div>
          
          <div className="engagement-list-scrollable">
            {formData.share?.shared_person && 
              Object.entries(formData.share.shared_person).map(([id, person], index) => (
                <div className="engagement-item" key={id}>
                  <span className="serial-no">{index + 1}</span>
                  <div className="user-info">
                    <img src={person.image} alt={person.name} className="user-avatar" />
                    <span className="user-name">{person.name}</span>
                  </div>
                  <span className="shared-via">{person.shared_via}</span>
                  <span className="user-role">{person.role}</span>
                </div>
              ))
            }
          </div>
        </div>
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