"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, Loader2 } from "lucide-react";

export default function CustomModal(props: {
  width?: string;
  open?: boolean;
  onClose?: (value?: boolean) => void;
  children?: React.ReactNode;
  title?: string;
  loading?: boolean;
}) {
  const { open, onClose, children, title, loading, width } = props;

  return (
    <Dialog
      open={open}
      onOpenChange={(Value) => {
        if (onClose) {
          onClose(Value);
        }
      }}
    >
      <DialogContent
        className={`[&>button]:hidden p-0 w-[700px]`}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogTitle className="hidden"></DialogTitle>
        <div className="w-full border-b-2 px-3 py-2 flex justify-between items-center">
          <div>{title ? title : ""}</div>
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <X
              size={16}
              className="cursor-pointer hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) {
                  onClose(false);
                }
              }}
            />
          )}
        </div>

        <div className="w-full px-3 pt-1 pb-4">
          {open
            ? React.cloneElement(children as React.ReactElement, {
                key: open ? "open" : "closed",
              })
            : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
