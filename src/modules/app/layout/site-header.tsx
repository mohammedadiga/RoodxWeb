'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
// Modules
import { SearchForm } from '@/modules/app/layout/search-form';


export function SiteHeader() {
    const pathname = usePathname();
  return (
    <header className="sticky shrink-0 top-0 z-50 w-full h-16 bg-primary backdrop-blur mb-5 rounded-t-[10px] shadow-md">
      <div className="flex h-14 items-center gap-2 md:gap-4 px-4">
        <SidebarTrigger className="size-8"/>
        <Separator orientation="vertical" className="data-[orientation=vertical]:h-4 bg-white" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>{pathname.replace('/', '').charAt(0).toUpperCase() + pathname.slice(2)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  );
}
