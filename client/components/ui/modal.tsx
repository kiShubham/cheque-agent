"use client";

import React, { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  open: boolean;
  toggle: (open: boolean) => void;
  width?: number; // should be px
}

const Modal: FC<Props> = ({ children, open, toggle, width }) => {
  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogContent
        style={{ width: width }}
        className={cn(
          `p-0 rounded-3xl border-none shadow-none sm:max-w-none max-w-none`
        )}
      >
        <DialogTitle hidden></DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
