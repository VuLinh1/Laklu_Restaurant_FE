interface ConditionalVisibilityProps {
  visible: boolean | (() => boolean);
  children: React.ReactNode;
}

export default function ConditionalVisibility({
  visible,
  children,
}: ConditionalVisibilityProps) {
  return visible ? <>{children}</> : null;
}
