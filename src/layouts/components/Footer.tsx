import { Typography } from '~/components/index.ts';
import { EMAIL_HELPER } from '~/constants/commonConstants.ts';
import { cn } from '~/utils/cssUtils.ts';

function Footer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <footer
      {...props}
      className={cn(
        'flex flex-col items-center justify-center py-8 px-1 sm:px-2 bg-sub text-[#868e96] text-sm',
        className
      )}
    >
      <Typography className="!mb-2 !text-main" copyable>
        {EMAIL_HELPER}
      </Typography>
      <Typography>© Comic Corporation. All rights reserved.</Typography>
    </footer>
  );
}

export default Footer;
