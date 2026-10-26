export type DashboardSearchKind =
  | "challenges"
  | "circles"
  | "leaderboard"
  | "submissions"
  | "earnings"
  | "analytics"
  | "help"
  | "payments";

export type DashboardSearchIntent = {
  placeholder: string;
  kind: DashboardSearchKind;
  submitHref?: string;
};

export function resolveDashboardSearch(pathname: string): DashboardSearchIntent {
  if (pathname.startsWith("/brand")) {
    if (/^\/brand\/challenges\/[^/]+/.test(pathname)) {
      return {
        placeholder: "Search rank, creator, platform or score",
        kind: "leaderboard",
      };
    }
    if (pathname.startsWith("/brand/challenges")) {
      return { placeholder: "Search your challenges", kind: "challenges" };
    }
    if (pathname.startsWith("/brand/submissions")) {
      return { placeholder: "Search submissions", kind: "submissions" };
    }
    if (pathname.startsWith("/brand/payments")) {
      return { placeholder: "Search payments", kind: "payments" };
    }
    if (pathname.startsWith("/brand/analytics")) {
      return { placeholder: "Search analytics", kind: "analytics" };
    }
    if (pathname.startsWith("/brand/profile")) {
      return {
        placeholder: "Search your challenges",
        kind: "challenges",
        submitHref: "/brand/challenges",
      };
    }
    return {
      placeholder: "Search your challenges",
      kind: "challenges",
      submitHref: "/brand/challenges",
    };
  }

  if (pathname.includes("/dashboard/challenge/")) {
    return { placeholder: "Search leaderboard", kind: "leaderboard" };
  }
  if (
    pathname.startsWith("/challenges") ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard")
  ) {
    return {
      placeholder: "Search challenges",
      kind: "challenges",
      submitHref: pathname === "/dashboard" ? "/challenges" : undefined,
    };
  }
  if (pathname.includes("/circle-profile/earnings")) {
    return { placeholder: "Search challenges", kind: "challenges" };
  }
  if (pathname.includes("/circle-profile")) {
    return { placeholder: "Search challenges", kind: "challenges" };
  }
  if (pathname.startsWith("/creator-circles/explore")) {
    return { placeholder: "Search circles", kind: "circles" };
  }
  if (pathname.startsWith("/creator-circles") || pathname.startsWith("/profile")) {
    return { placeholder: "Search your circles", kind: "circles" };
  }
  if (pathname.startsWith("/portfolio")) {
    return { placeholder: "Search earnings", kind: "earnings" };
  }
  if (pathname.startsWith("/analytics")) {
    return { placeholder: "Search analytics", kind: "analytics" };
  }
  if (pathname.startsWith("/support")) {
    return { placeholder: "Search help", kind: "help" };
  }

  return { placeholder: "Search Starix", kind: "challenges", submitHref: "/challenges" };
}

export function matchesDashboardQuery(
  query: string,
  ...values: Array<string | number | null | undefined>
) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return values.some((value) =>
    String(value ?? "")
      .toLowerCase()
      .includes(needle)
  );
}
