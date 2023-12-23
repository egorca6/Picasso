import { useGetPostsQuery } from "../services/apiService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PostListStyle.css";

const PostList = () => {
  const [limit, setlimit] = useState(15);
  const [fetching, setFetching] = useState(false);
  const { data, error, isLoading, isFetching } = useGetPostsQuery(limit);

  useEffect(() => {
    if (fetching && !isFetching && data.length < 100) {
      setlimit((limit) => limit + 10);
    }
    setFetching(false);
  }, [fetching, isFetching, data]);

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    let heightPage = e.target.documentElement.scrollHeight;
    let scrollTop = e.target.documentElement.scrollTop;
    let heightView = window.innerHeight;
    if (heightPage - (scrollTop + heightView) < 100) {
      setFetching(true);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <div>
      <h1>Post List</h1>
      <div>
        {data.map((post) => (
          <div key={post.id} className="post-container">
            <p className="post-title">
              {post.id} - {post.title}!!
              {post.body.slice(0, 50) + "..."}
              <Link to={`/post/${post.id}`}>
                <button className="post-button">Просмотр</button>
              </Link>
            </p>
          </div>
        ))}
      </div>
      {isFetching && <p>Загрузка...</p>}
    </div>
  );
};

export default PostList;
