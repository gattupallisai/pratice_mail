import Navbar from "./Navbar"; // Adjust path if different

export const metadata = {
  title: "CQMail",
  description: "Empower Your Inbox with Speed, Security, and Simplicity",
};

export default function MailAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
