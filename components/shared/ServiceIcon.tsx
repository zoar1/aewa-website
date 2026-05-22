import {
  // Service icons
  Users,
  Wrench,
  FileCheck,
  ScanSearch,
  Anchor,
  Briefcase,
  // Contact icons
  Phone,
  Mail,
  MapPin,
  Clock,
  // Misc
  CheckCircle2,
  type LucideProps,
} from "lucide-react";

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  // Services
  users: Users,
  wrench: Wrench,
  "file-check": FileCheck,
  "scan-search": ScanSearch,
  anchor: Anchor,
  briefcase: Briefcase,
  // Contact
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
  clock: Clock,
  // Misc
  "check-circle": CheckCircle2,
};

interface ServiceIconProps extends LucideProps {
  name: string;
}

export default function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const Icon = ICON_MAP[name] ?? Briefcase;
  return <Icon {...props} />;
}
