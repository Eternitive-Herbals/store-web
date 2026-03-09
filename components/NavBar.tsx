import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import NavActions from "./NavActions";
import Logo from "../assets/athery_Logo.svg";

const NavBar = async () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "#" },
    { name: "Product", href: "/product" },
    { name: "Contact", href: "#" },
  ];
  return (
    <nav className="bg-nav-background text-nav-foreground fixed top-8 right-0 left-0 z-20 mx-auto flex h-16 w-full max-w-2xl items-center justify-between rounded-3xl px-4 backdrop-blur-2xl sm:max-w-4xl md:max-w-6xl">
      <div className="text-medium relative flex w-full items-center justify-between px-2">
        <span className="flex shrink-0 items-center justify-start">
          <Image
            src={Logo}
            alt="athery logo"
            width={100}
            height={100}
            className="ml-4"
          />
        </span>

        <span className="absolute left-1/2 flex -translate-x-1/2 items-center justify-between gap-2">
          {links.map((link) => (
            <div className="flex items-center justify-center" key={link.name}>
              <Link
                href={link.href}
                className="px-4 py-2 text-lg font-extralight tracking-wider"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </span>

        <span className="flex items-center justify-between gap-4">
          <SearchBar />
          <NavActions />
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
