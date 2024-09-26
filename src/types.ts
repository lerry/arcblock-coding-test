import { SVGProps } from 'react';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type UserProfileProps = {
  username: string;
  email: string;
  mobile: string;
  motto?: string;
};
