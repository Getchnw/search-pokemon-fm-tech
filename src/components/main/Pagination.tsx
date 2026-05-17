"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // หากคำนวณแล้วมีจำนวนหน้าไม่ถึง 2 หน้า (เช่น ผลลัพธ์จากการ Filter มีน้อย) จะไม่เรนเดอร์แถบแบ่งหน้าให้รก UI
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-6 py-6 w-full border-t border-ui-border mt-8">
      {/* ⬅️ ปุ่มย้อนกลับ (Previous Button) */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1} // ล็อกปุ่มอัตโนมัติถ้าอยู่หน้า 1
        className="flex items-center gap-1 hover:bg-brand-primary hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>

      {/* 🔢 ส่วนแสดงตำแหน่งหน้าปัจจุบัน */}
      <div className="text-sm font-medium text-text-muted">
        Page <span className="text-text-main font-bold">{currentPage}</span> of{" "}
        <span className="text-text-main font-bold">{totalPages}</span>
      </div>

      {/* ➡️ ปุ่มไปข้างหน้า (Next Button) */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages} // ล็อกปุ่มอัตโนมัติถ้าอยู่หน้าสุดท้าย
        className="flex items-center gap-1 hover:bg-brand-primary hover:text-white transition-colors"
      >
        <span>Next</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
