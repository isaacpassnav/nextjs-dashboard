'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function PaginationContent({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query') || '';
  
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    params.set('page', pageNumber.toString());
    return `/dashboard/invoices?${params.toString()}`;
  };
  
  return (
    <div className="flex justify-center mt-4 gap-3">
      {page > 1 && (
        <Link
          href={createPageURL(page - 1)}
          className="px-4 py-2 border rounded"
        >
          Previous
        </Link>
      )}
      <span>Page {page} of {totalPages}</span>
      {page < totalPages && (
        <Link
          href={createPageURL(page + 1)}
          className="px-4 py-2 border rounded"
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default function Pagination({ totalPages }: { totalPages: number }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaginationContent totalPages={totalPages} />
    </Suspense>
  );
}