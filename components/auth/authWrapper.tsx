'use client';
import * as React from 'react';
import Image from 'next/image';
import logo from '@/assets/main-logo.png';

import { Card, CardContent } from '@/components/ui/card';

import Link from 'next/link';
interface AuthWrapperProps {
  children: React.ReactNode;
  pageTitle: string;
  pageSubTitle?: string;
}
export default function AuthWrapper({
  children,
  pageTitle,
  pageSubTitle,
}: AuthWrapperProps) {
  const date = new Date().getFullYear();
  return (
    <div className="bg-black p-6 text-white relative h-screen flex flex-col">
      <div className="flex justify-center lg:mt-20 my-8">
        {/* Image */}
        <Link href={'/login'}>
          <Image
            src={logo}
            alt="Logo"
            width={164}
            height={36}
            className="w-52"
            priority
          />
        </Link>
      </div>
      <div className="flex  items-center justify-center ">
        <div className="text-muted-foreground relative z-10 w-full max-w-md rounded-xl shadow">
          {/* Form Card */}
          <Card className="rounded-xl ">
            <CardContent className="p-8 py-12">
              <div className="mt-6 mb-3 text-center">
                <h1 className="text-4xl font-medium text-gray-800">
                  {pageTitle}
                </h1>
                <p>{pageSubTitle}</p>
              </div>

              {children}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="  items-center justify-between  pt-8 text-sm md:flex-row text-center text-gray-500   -translate-x-1/2 left-1/2 bottom-5 absolute ">
        <p>&copy; {date} Panterrium. Secure admin infrastructure.</p>
      </div>
    </div>
  );
}
