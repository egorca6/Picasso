import { useGetPostsQuery } from "../services/apiService";
import { Link } from "react-router-dom";

const PostList = () => {
  const { data, error, isLoading } = useGetPostsQuery();

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
          <div key={post.id}>
            <p>
              {post.id} - {post.title}!!
              {post.body.slice(0, 50) + "..."}
              <Link to={`/post/${post.id}`}>
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
