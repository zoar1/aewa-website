import {
  Users,
  Wrench,
  FileCheck,
  ScanSearch,
  Anchor,
  Briefcase,
  type LucideProps,
} from "lucide-react";

const ICON_MAP: Record<string, React.FC<LucideProps>> = {
  users: Users,
  wrench: Wrench,
  "file-check": FileCheck,
  "scan-search": ScanSearch,
  anchor: Anchor,
  briefcase: Briefcase,
};

interface ServiceIconProps extends LucideProps {
  name: string;
}

export default function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const Icon = ICON_MAP[name] ?? Briefcase;
  return <Icon {...props} />;
}
