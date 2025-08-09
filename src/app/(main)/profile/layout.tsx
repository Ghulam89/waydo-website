import ProfileComponent from "@components/pages/profile";

export default function Profile({ children }: { children: React.ReactNode }) {
  return <ProfileComponent>{children}</ProfileComponent>;
}
