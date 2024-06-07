"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbProps {
  title?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
  const pathname = usePathname();

  if (!pathname) {
    return null; // or you can return a loading spinner or a placeholder if pathname is null
  }

  const pathnames = pathname.split('/').filter((x) => x);
  return (
    <nav className="flex items-center space-x-2 text-sm ">
      <Link href="/">
        <p className="text-white  font-bold hover:bg-white hover:text-black hover:rounded-lg hover:opacity-75 capitalize p-2">Home</p>
      </Link>
      {pathnames.map((_, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return (
          <React.Fragment key={routeTo}>
            <span className="mx-2">{'>'}</span>
            {isLast ? (
              <span className="text-white capitalize">
                {isLast && title ? decodeURIComponent(title) : decodeURIComponent(_)}
              </span>
            ) : (
              <Link href={routeTo}>
                <p className="text-gray-100 hover:text-black   font-bold hover:bg-white hover:rounded-lg hover:opacity-75 capitalize p-1">
                  {decodeURIComponent(_)}
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
