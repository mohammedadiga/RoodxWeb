import Link from 'next/link';
// Components
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Button } from '@/components/ui/button';
// Icon
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function SearchModule({ open, setOpen }: Props) {
  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 ">
        <Command>
          <CommandList className="py-5 px-7 max-h-[500px]">
            <CommandEmpty>No results found.</CommandEmpty>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <CommandGroup heading="Populer Searches" className="[&_[cmdk-group-heading]]:text-sm [&_[cmdk-group-heading]]:font-normal [&_[cmdk-group-heading]]:text-default-400 [&_[cmdk-group-heading]]:mb-2.5 [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest">
                <CommandItem className="aria-selected:bg-transparent p-0 mb-2.5">
                  <Link href="/calendar-page" className="flex gap-1 items-center px-2 text-default-500 hover:text-primary ">
                    {/* <Icon icon="heroicons:calendar-days" /> */}
                    <span>Calendar</span>
                  </Link>
                </CommandItem>
                <CommandItem className="aria-selected:bg-transparent p-0 mb-2.5">
                  <Link href="/dashboard" className="flex gap-1 items-center px-2 text-default-500 hover:text-primary ">
                    {/* <Icon icon="heroicons:chart-bar" /> */}
                    <span>Analytics</span>
                  </Link>
                </CommandItem>
              </CommandGroup>
            </div>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
