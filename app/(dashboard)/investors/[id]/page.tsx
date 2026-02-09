'use client';

import { DetailsView } from '@/components/dashboard/investors';
import { useParams } from 'next/navigation';

export default function InvestorByIdPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      {' '}
      <DetailsView id={id} />
    </div>
  );
}
