import { Search } from 'lucide-react';

type Props = {
  handleOpenSearch: () => void;
};

export default function SearchButton({ handleOpenSearch }: Props) {
  return (
    <button className=" inline-flex  gap-2 items-center text-default-600 text-sm" onClick={handleOpenSearch}>
      <span>
        <Search className=" h-4 w-4" />
      </span>
      <span className=" md:block hidden"> Search...</span>
    </button>
  );
}
