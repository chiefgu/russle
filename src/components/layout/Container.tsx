import { cn } from '@/lib/cn';

type ContainerProps = {
  children: React.ReactNode;
  size?: 'main' | 'narrow';
  className?: string;
};

export function Container({ children, size = 'main', className }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 md:px-8',
        size === 'main' ? 'max-w-[1800px]' : 'max-w-[900px]',
        className,
      )}
    >
      {children}
    </div>
  );
}
