"use client";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. ดึงค่าคำค้นหาปัจจุบันจาก URL มาเซ็ตเป็นค่าเริ่มต้นของ Input
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") || "",
  );

  // 2. หน่วงเวลา 300ms หลังจากหยุดพิมพ์ แล้วส่งค่าขึ้น URL
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (inputValue) {
        params.set("search", inputValue);
      } else {
        params.delete("search");
      }
      params.set("page", "1");

      router.push(`${pathname}?${params.toString()}`);
    }, 300); // หน่วงเวลา 300 มิลลิวินาที

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <InputGroup className="max-w-xs w-full">
      {/* ผูก value และ onChange เข้ากับ Local State เพื่อการพิมพ์ที่ลื่นไหลไม่กระตุก */}
      <InputGroupInput
        placeholder="Search Pokémon..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <InputGroupAddon>
        <Search className="w-4 h-4 text-text-disabled" />
      </InputGroupAddon>
    </InputGroup>
  );
}
