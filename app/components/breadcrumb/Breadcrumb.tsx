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
    return null; // veya pathname null ise bir yükleme simgesi veya yer tutucu döndürebilirsiniz
  }

  const pathSegments = pathname.split('/').filter(segment => segment);

  const isBlogPage = pathSegments.includes('blog');
  const isCategoryPage = pathSegments.includes('category') && !isBlogPage;

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <Link href="/">
        <p className="text-white font-bold hover:bg-white hover:text-black hover:rounded-lg hover:opacity-75 capitalize p-2">Home</p>
      </Link>
      {isBlogPage && category && (
        <>
          <span className="mx-2">{'>'}</span>
          <Link href={`/category/${encodeURIComponent(category.toLowerCase().replace(/ /g, '-'))}`}>
            <p className="text-gray-100 hover:text-black font-bold hover:bg-white hover:rounded-lg hover:opacity-75 capitalize p-1">
              {decodeURIComponent(category)}
            </p>
          </Link>
          {title && (
            <>
              <span className="mx-2">{'>'}</span>
              <span className="text-white capitalize">{decodeURIComponent(title)}</span>
            </>
          )}
        </>
      )}
      {isCategoryPage && category && (
        <>
          <span className="mx-2">{'>'}</span>
          <Link href="/blog">
            <p className="text-gray-100 hover:text-black font-bold hover:bg-white hover:rounded-lg hover:opacity-75 capitalize p-1">
              Category
            </p>
          </Link>
          <span className="mx-2">{'>'}</span>
          <span className="text-white capitalize">{decodeURIComponent(category)}</span>
        </>
      )}
      {!isBlogPage && !isCategoryPage && pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const decodedSegment = decodeURIComponent(segment.replace(/-/g, ' '));

        return (
          <React.Fragment key={index}>
            <span className="mx-2">{'>'}</span>
            {isLast ? (
              <span className="text-white capitalize">{decodedSegment}</span>
            ) : (
              <Link href={href}>
                <p className="text-gray-100 hover:text-black font-bold hover:bg-white hover:rounded-lg hover:opacity-75 capitalize p-1">
                  {decodedSegment}
                </p>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
