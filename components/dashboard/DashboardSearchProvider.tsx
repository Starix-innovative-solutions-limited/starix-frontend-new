"use client";

import React, {
  Suspense,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import {
  resolveDashboardSearch,
  type DashboardSearchIntent,
} from "@/lib/dashboardSearch";

type DashboardSearchContextValue = {
  query: string;
  setQuery: (value: string) => void;
  placeholder: string;
  intent: DashboardSearchIntent;
  onSubmit: () => void;
};

const DashboardSearchContext =
  createContext<DashboardSearchContextValue | null>(null);

function writeQueryParam(
  pathname: string,
  current: URLSearchParams,
  query: string
) {
  const next = new URLSearchParams(current.toString());
  const trimmed = query.trim();
  if (trimmed) next.set("q", trimmed);
  else next.delete("q");
  const qs = next.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function DashboardSearchProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const searchParams = useSearchParams();
  const intent = useMemo(
    () => resolveDashboardSearch(pathname),
    [pathname]
  );
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQueryState] = useState(urlQuery);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQueryState(urlQuery);
  }, [urlQuery, pathname]);

  const commit = useCallback(
    (value: string, href = pathname) => {
      const target =
        href === pathname
          ? writeQueryParam(pathname, searchParams, value)
          : writeQueryParam(href, new URLSearchParams(), value);
      router.replace(target, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const setQuery = useCallback(
    (value: string) => {
      setQueryState(value);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => commit(value), 250);
    },
    [commit]
  );

  const onSubmit = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intent.submitHref && intent.submitHref !== pathname) {
      commit(query, intent.submitHref);
      return;
    }
    commit(query);
  }, [commit, intent.submitHref, pathname, query]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const value = useMemo(
    () => ({
      query,
      setQuery,
      placeholder: intent.placeholder,
      intent,
      onSubmit,
    }),
    [intent, onSubmit, query, setQuery]
  );

  return (
    <DashboardSearchContext.Provider value={value}>
      {children}
    </DashboardSearchContext.Provider>
  );
}

export function useDashboardSearch() {
  const context = useContext(DashboardSearchContext);
  if (!context) {
    return {
      query: "",
      setQuery: () => undefined,
      placeholder: "Search Starix",
      intent: resolveDashboardSearch(""),
      onSubmit: () => undefined,
    } satisfies DashboardSearchContextValue;
  }
  return context;
}

export function DashboardSearchBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={children}>
      <DashboardSearchProvider>{children}</DashboardSearchProvider>
    </Suspense>
  );
}

export function DashboardSearchInput({
  className = "",
}: {
  className?: string;
}) {
  const { query, setQuery, placeholder, onSubmit } = useDashboardSearch();

  return (
    <div className={`relative flex-1 ${className}`}>
      <FiSearch
        className="absolute top-1/2 left-4 -translate-y-1/2 text-[#9CA3AF]"
        size={18}
      />
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            onSubmit();
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-full border-none bg-[#F8FAFC] py-3 pr-4 pl-12 text-sm outline-none placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
