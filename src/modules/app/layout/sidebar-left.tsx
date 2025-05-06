'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Icons
import { Command, Frame, Home, Inbox, PieChart, Search, Sparkles } from 'lucide-react';
// Components
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
// Modules
import { NavMain } from '@/modules/app/layout/nav-main';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Home',
      url: '/home',
      icon: Search,
    },
    {
      title: 'Jobs',
      url: '/job',
      icon: Sparkles,
    },
    {
      title: 'Videos',
      url: '/video',
      icon: Home,
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: Inbox,
    },
  ],
};

export function SidebarLeft({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  // Automatically set isActive
  const navMainWithActive = data.navMain.map((item) => ({
    ...item,
    isActive: pathname.startsWith(item.url),
  }));

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/home">
              <h1 className="font-bold text-[24px] text-center w-full">Logo</h1>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainWithActive} className="mt-6" />
        {/* <NavMain items={data.navMain} /> */}
        {/* <NavProjects projects={data.projects} /> */}
        {/*<NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
    </Sidebar>
  );
}
