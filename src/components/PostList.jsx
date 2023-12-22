import { useGetPostsQuery } from "../services/apiService";
import { useState } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const { data, error, isLoading } = useGetPostsQuery();
  const [expandedPostId, setExpandedPostId] = useState(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Post List</h1>
      <div>
        {data.map((post) => (
          <div key={post.id}>
            <p>
              {post.id} - {post.title}!!
              {expandedPostId === post.id
                ? post.body
                : `${post.body.slice(0, 50)}...`}
              <Link to={`/posts/${post.id}`}>
                <button>Просмотр</button>
              </Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
