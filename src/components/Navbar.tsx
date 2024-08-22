import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import tw from 'twin.macro';
import icpLogo from '../assets/icp.webp';
import { useBreakpoint } from '../hooks/utils/useBreakpoint';
import useIdentity from '../services/userService';
import LoginArea from './LoginArea';
import Tooltip from './utils/Tooltip';

interface NavItemProps {
  to: string;
  children?: ReactNode;
}

function NavItem({ to, children }: NavItemProps) {
  const location = useLocation();

  return (
    <Link to={to} tw="block">
      <div
        tw="px-4 py-3 text-lg box-border hover:bg-gray-200 [border: 4px solid transparent]"
        css={[location.pathname === to && tw`border-b-background`]}
      >
        {children}
      </div>
    </Link>
  );
}

export default function Navbar() {
  const user = useIdentity();
  const breakpoint = useBreakpoint();

  const isMobile = breakpoint === 'xs';

  return (
    <>
      <div tw="h-[60px]" />
      <div tw="fixed top-0 left-0 right-0 z-50 bg-gray-100 text-gray-800 shadow-lg shadow-background">
        <div tw="flex gap-3 px-5 items-center">
          <div tw="flex justify-center w-full">
            <NavItem to="/">Home</NavItem>
            {!!user && <NavItem to="/verify">Verify</NavItem>}
          </div>
          {!user && <LoginArea />}
        </div>
      </div>
    </>
  );
}
