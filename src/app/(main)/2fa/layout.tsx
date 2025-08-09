import TwoFactorAuthComponent from "@components/pages/2fa";

type Props = {
  children: React.ReactNode;
};

export default function TwoFactorAuth({ children }: Props) {
  return (
    <TwoFactorAuthComponent>
      {children}
    </TwoFactorAuthComponent>
  );
}
