interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center border-b border-border py-5 px-3">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
