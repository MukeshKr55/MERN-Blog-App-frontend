import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postID,
  category,
  title,
  desc,
  authorID,
  createdAt,
  thumbnail,
}) => {
  const shortDesc = desc.length > 145 ? desc.substr(0, 145) + "..." : desc;
  const shortTitle = title.length > 145 ? title.substr(0, 145) + "..." : title;
  return (
    <article className="post">
      <div className="post__thumbnail">
        <img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
          alt={title}
        />
      </div>
      <div className="post__content">
        <Link to={`/posts/${postID}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: shortDesc }} />
        <div className="post__footer">
          <PostAuthor authorID={authorID} createdAt={createdAt} />
          <Link
            style={{
              background: "rgb(222,237,255)",
              padding: "0.7rem",
              borderRadius: "10%",
            }}
            to={`/posts/categories/${category}`}
          >
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
