// components/ui/pagination.tsx
"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) => {
    console.log(totalPages,"totalPages---->")
  return (
    <div className="flex justify-between gap-4 items-center py-4">
      {/* Left: Previous Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>

      {/* Center: Page Info */}
      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages || 1}
      </span>

      {/* Right: Next Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={currentPage >= totalPages || totalPages === 0}
      >
        Next
      </Button>
    </div>
  );
};
