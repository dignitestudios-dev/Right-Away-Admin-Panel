import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}
const SkeletonRow = (index) => (
  <TableRow key={`loading-${index}`}>
    {/* User / Rider */}
    <TableCell>
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </TableCell>

    {/* Contact */}
    <TableCell>
      <div className="space-y-1">
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-2 w-1/2" />
      </div>
    </TableCell>

    {/* Join Date */}
    <TableCell>
      <Skeleton className="h-3 w-1/2" />
    </TableCell>

    {/* Status */}
    <TableCell>
      <Skeleton className="h-5 w-16 rounded-full" />
    </TableCell>

    {/* Actions */}
    <TableCell className="text-right">
      <Skeleton className="h-8 w-8 rounded-full inline-block" />
    </TableCell>
  </TableRow>
);
export { Skeleton,SkeletonRow };
