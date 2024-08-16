import React from 'react';
import { BlogPost } from '../types/BlogPost';
import Link from 'next/link';

async function fetchPosts(): Promise<BlogPost[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

const HomePage: React.FC = async () => {
  const posts = await fetchPosts();

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-4xl font-bold mb-8 text-center'>Blog Posts</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {posts.map((post) => (
          <div key={post.id} className='bg-white rounded-lg shadow-md p-6'>
            <Link href={`/posts/${post.id}`}>
              <h2 className='text-xl font-semibold mb-4 cursor-pointer hover:underline'>{post.title}</h2>
            </Link>
            <p className='text-gray-700'>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
