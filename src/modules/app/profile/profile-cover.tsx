import Image from 'next/image';

export default function ProfileCover() {
  return (
    <div className="relative w-full h-[150px] md:h-[200px] lg:h-[250px] mb-4">
      <Image src="/images/cover.jpg" alt="Image" fill className="rounded-md object-cover" />
      {/* <div className="absolute bottom-0 left-0 w-full h-full rounded-md bg-gradient-to-t from-black/60 z-10" /> */}
    </div>
  );
}
