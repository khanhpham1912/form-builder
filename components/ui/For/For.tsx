export const For = <T extends Object>({
  each = [],
  children,
}: {
  each: T[]
  children: (data: T, index?: number) => React.ReactNode
}) => {
  return <>{each.map((data: T, index) => children(data, index))}</>
}
