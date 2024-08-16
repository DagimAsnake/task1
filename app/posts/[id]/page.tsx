'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BlogPost } from '../../../types/BlogPost';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      if (!response.ok) {
        setPost(null);
      } else {
        const data = await response.json();
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  if (!post) {
    return <div className="container mx-auto p-6">Post not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
      <button
        className="mt-8 text-blue-500 hover:underline"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default PostPage;
