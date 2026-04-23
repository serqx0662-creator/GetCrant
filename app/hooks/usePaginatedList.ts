"use client";

import { useState } from "react";

const PAGE_SIZE = 6;

export function usePaginatedList<T>(items: T[]) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const visible = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const canCollapse = visibleCount > PAGE_SIZE;

  const showMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  const collapse = () => {
    setVisibleCount(PAGE_SIZE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reset = () => setVisibleCount(PAGE_SIZE);

  return { visible, hasMore, canCollapse, showMore, collapse, reset };
}
