import MailAppLayout from "./MailApp/layout";
// Update the import path to match the actual file name and location
import MailAppHome from "./MailApp/page";

export default function HomePage() {
  return (
    <MailAppLayout>
      <MailAppHome />
    </MailAppLayout>
  );
}

