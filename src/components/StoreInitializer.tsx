"use client";

import { useRef } from "react";
import useStore from "@/store";
import { DataType } from "@/types/data";

export function StoreInitializer({
  data,
  currentPage,
}: {
  data: DataType[];
  currentPage: number;
}) {
  const isInitialized = useRef(false);

  if (!isInitialized.current) {
    useStore.setState({
      data,
      currentPage,
    });
    isInitialized.current = true;
  }
  return null;
}
