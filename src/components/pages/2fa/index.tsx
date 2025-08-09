import { ReactNode } from "react";

type Props = {
  children: ReactNode;
}

export default function TwoFactorAuth({ children }: Props) {

  /**
   * TODO:
   * Validate whether the user already activated 2FA to render this page
   */

  return (
    <div>
      {children}
    </div>
  );
}