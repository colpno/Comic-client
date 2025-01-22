import { Button, Form, Typography } from '~/components/index.ts';
import { FormProps } from '~/types/index.ts';
import { cn } from '~/utils/cssUtils.ts';

interface Props extends Omit<FormProps, 'title'> {
  title: string;
}

function FilterForm({ validationSchema, onSubmit, title, children, className, ...props }: Props) {
  const renderChildren = typeof children === 'function' ? children : () => children;

  return (
    <Form
      {...props}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      className={cn('space-y-3', className)}
    >
      {({ reset, ...states }) => (
        <>
          <div className="flex items-center justify-between">
            <Typography variant="h6">{title}</Typography>
            <Button variant="text" className="!text-primary-500" onClick={() => reset()}>
              Clear
            </Button>
          </div>
          <Button variant="contained" type="submit" fullWidth size="small">
            Apply
          </Button>
          {renderChildren({ reset, ...states })}
        </>
      )}
    </Form>
  );
}

export default FilterForm;
