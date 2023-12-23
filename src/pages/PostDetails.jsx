import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../services/apiService";

const PostDetail = () => {
  const { id } = useParams();

  const { data: post, error, isLoading } = useGetPostByIdQuery(id);

  useEffect(() => {}, [id]);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  return (
    <div>
      <h2>Детали Поста</h2>
      {post ? (
        <div>
          userId - {post.userId}
          <p>
            {post.id} - {post.title}
          </p>
          <p>{post.body}</p>
        </div>
      ) : (
        <p>Данные отсутствуют</p>
      )}
      <Link to="/">Назад</Link>
    </div>
  );
};

export default PostDetail;
