import Link from 'next/link';
import NavLinks from '@/app/ui/puppies/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';

export default function SideNav() {
  return (
    <div className="justify-start flex w-full flex-row px-2 py-1 md:px-1">
      <Link
        className="mb-10 flex h-10 items-end justify-start rounded-md bg-blue-600 p-2 md:h-20 w-65"
        href="/"
      >
        <div className="w-60 text-white md:w-60">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* <NavLinks /> */}
        <form>
          {/* <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <div className="hidden md:block">Sign Out</div>
          </button> */}
        </form>
      </div>
    </div>
  );
};