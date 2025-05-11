import Image from 'next/image';
// Interface
import { IUser } from '@/interface/Auth.interface';

interface Props {
  items: IUser;
}

export default function ProfileAvatar({ items }: Props) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative w-[100px] h-[100px]">
        <Image src="/images/cover.jpg" alt="Profile" fill className={items.accountType === 'user' ? `rounded-full object-cover` : `rounded-md object-cover`} />
      </div>

      <div className="flex flex-col justify-center gap-1">
        <h1 className="text-xl font-semibold text-roodx-headingText">{items.accountType === 'user' ? `${items.firstname} ${items.lastname}` : items.companyname}</h1>
        <h3 className="text-xs text-roodx-primary">@{items.username}</h3>
        <p className="text-md text-roodx-headingText">{items.about?.category}</p>
        <p className="text-sm text-roodx-paragrafText">{items.about?.headline}</p>
      </div>
    </div>
  );
}
