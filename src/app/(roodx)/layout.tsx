// Modules
import { SidebarLeft } from '@/modules/app/layout/sidebar-left';
import { SidebarRight } from '@/modules/app/layout/sidebar-right';
// Components
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SiteHeader } from '@/modules/app/layout/site-header';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
      <SidebarRight side="right" />
    </SidebarProvider>
  );
}
