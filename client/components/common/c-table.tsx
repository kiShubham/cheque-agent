"use client";

import React, { ReactNode, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ColumnType<T> {
  title: ReactNode;
  key: string;
  render: (record: T) => ReactNode;
}

interface Pagination {
  current: number;
  pageSize: number;
  total: number;
}

interface CustomTableProps<T> {
  columns: ColumnType<T>[];
  dataSource: T[];
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
  checkbox?: boolean;
  loading?: boolean;
}

export function CustomTable<T>({
  columns,
  dataSource,
  pagination,
  onPageChange,
  checkbox = false,
  loading = false,
}: CustomTableProps<T>) {
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.pageSize)
    : 1;

  const currentPage = pagination?.current || 1;
  const [checkedRows, setCheckedRows] = useState<Record<number, boolean>>({});

  const generatePageNumbers = () =>
    Array.from({ length: totalPages }, (_, i) => i + 1);

  const toggleRow = (index: number, checked: boolean) => {
    setCheckedRows((prev) => ({ ...prev, [index]: checked }));
  };

  const toggleAll = (checked: boolean) => {
    const newChecked: Record<number, boolean> = {};
    dataSource.forEach((_, idx) => {
      newChecked[idx] = checked;
    });
    setCheckedRows((prev) => ({ ...prev, ...newChecked }));
  };

  const allChecked =
    dataSource.length > 0 &&
    dataSource.every((_, idx) => checkedRows[idx] === true);

  return (
    <div className="space-y-4">
      <Table className="shadow-none border-none">
        <TableHeader>
          <TableRow className="border-b border-ui-card px-1 h-12">
            {checkbox && (
              <TableHead className="w-12">
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={(checked) => toggleAll(!!checked)}
                />
              </TableHead>
            )}
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className="font-bold text-base truncate px-1 max-w-28"
              >
                {col.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            [...Array(5)].map((_, rowIndex) => (
              <TableRow key={rowIndex} className="hover:bg-muted/50 px-5">
                {checkbox && (
                  <TableCell className="w-12">
                    <Skeleton className="h-4 w-4 rounded-sm" />
                  </TableCell>
                )}
                {columns.map((_, colIndex) => (
                  <TableCell key={colIndex} className="p-2.5 h-20">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : dataSource.length > 0 ? (
            dataSource.map((record, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="hover:bg-muted/50 px-5 transition-colors border-b-0"
              >
                {checkbox && (
                  <TableCell className="w-12">
                    <Checkbox
                      checked={checkedRows[rowIndex]}
                      onCheckedChange={(checked) =>
                        toggleRow(rowIndex, !!checked)
                      }
                    />
                  </TableCell>
                )}
                {columns.map((col, idx) => (
                  <TableCell
                    key={col.key}
                    className={cn(
                      "p-3 h-[3.625rem] font-normal text-base truncate max-w-28",
                      idx === 2 ? "text-primary" : ""
                    )}
                  >
                    {col.render(record)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (checkbox ? 1 : 0)}
                className="text-center py-10 text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {pagination && totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4 px-2 flex-wrap">
          <Button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage === 1}
            variant={"ghost"}
            size={"sm"}
          >
            <ChevronLeft strokeWidth={1} />
          </Button>

          {generatePageNumbers().map((page) => (
            <Button
              size={"sm"}
              variant={"ghost"}
              key={page}
              onClick={() => onPageChange?.(page)}
              className={cn(currentPage === page && "text-primary")}
            >
              {page}
            </Button>
          ))}

          <Button
            size={"sm"}
            variant={"ghost"}
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight strokeWidth={1} />
          </Button>
        </div>
      )}
    </div>
  );
}
