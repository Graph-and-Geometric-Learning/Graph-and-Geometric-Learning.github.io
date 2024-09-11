export const Placeholder = ({
  text,
  col_span,
  height = 300,
}: {
  text: string;
  col_span: number;
  height?: number;
}) => {
  return (
    <div
      className={`border-4 col-span-${col_span} flex justify-center items-center h-[${height}px]`}
    >
      {text}
    </div>
  );
};
