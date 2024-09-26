import { Link, NavbarBrand, NavbarContent, NavbarItem, Navbar as NextUINavbar } from '@nextui-org/react';

import siteConfig from '../config';
import { GithubIcon } from './icons';
import ThemeSwitch from './theme-switch';

export default function Navbar() {
  return (
    <NextUINavbar isBordered maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1 text-foreground" href="/">
            <img alt="logo" height={32} src="logo.png" width={32} />
            <p className="font-bold">{siteConfig.name}</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-full sm:basis-1/5" justify="end">
        <NavbarItem className="flex gap-2">
          <Link isExternal aria-label="Github" href={siteConfig.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
}
