'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
// Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
// Modules
import SearchButton from '@/modules/app/layout/search-button';
import SearchModule from '@/modules/app/layout/search-module';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky shrink-0 top-0 z-50 w-full h-16 bg-primary backdrop-blur mb-5 rounded-t-[10px] shadow-md">
      <div className="flex h-14 items-center gap-2 md:gap-4 px-4">
        <SidebarTrigger className="size-8" />
        <Separator orientation="vertical" className="data-[orientation=vertical]:h-4 bg-white" />
        <SearchButton handleOpenSearch={() => setOpen(true)} />
      </div>
      <SearchModule open={open} setOpen={setOpen} />
    </header>
  );
}
