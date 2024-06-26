// Breadcrumb.tsx
"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbProps {
  title?: string;
  category?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, category }) => {
  const pathname = usePathname();

  if (!pathname) {
    return null; // or you can return a loading spinner or a placeholder if pathname is null
  }

  return (
    <nav className="flex items-center space-x-2 text-sm ">
      <Link href="/">
        <p className="text-white font-bold hover:bg-white hover:text-black hover:rounded-lg hover:opacity-75 capitalize p-2">Home</p>
      </Link>
      {category && (
        <React.Fragment>
          <span className="mx-2">{'>'}</span>
          <Link href={`/category/${encodeURIComponent(category)}`}>
            <p className="text-gray-100 hover:text-black font-bold hover:bg-white hover:rounded-lg hover:opacity-75 capitalize p-1">
              {decodeURIComponent(category)}
            </p>
          </Link>
        </React.Fragment>
      )}
      {title && (
        <React.Fragment>
          <span className="mx-2">{'>'}</span>
          <span className="text-white capitalize">{decodeURIComponent(title)}</span>
        </React.Fragment>
      )}
    </nav>
  );
};

export default Breadcrumb;
