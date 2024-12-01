import { cn } from '~/utils/cssUtils.ts';

function Footer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      {...props}
      className={cn(
        'flex flex-col items-center justify-center py-10 px-1 sm:px-2 bg-secondary text-[#868e96] text-sm',
        className
      )}
    >
      © Comic Corporation. All rights reserved.
    </footer>
  );
}

export default Footer;
