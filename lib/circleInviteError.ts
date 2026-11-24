type InviteIssue = {
  email: string;
  reason: string;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function explainInviteReason(reason: string, email: string) {
  const text = reason.trim();
  const key = text.toLowerCase().replace(/[_-]+/g, " ");
  const who = email || "This email";

  if (
    key.includes("already a member") ||
    key.includes("already member") ||
    key.includes("already exist") ||
    key.includes("already in")
  ) {
    return `${who} is already a member of this circle.`;
  }
  if (key.includes("pending") || key.includes("already invited")) {
    return `${who} already has a pending invitation to this circle.`;
  }
  if (key.includes("yourself")) {
    return "You can't invite your own email.";
  }
  if (
    key.includes("not found") ||
    key.includes("no account") ||
    key.includes("does not exist") ||
    key.includes("doesn't exist") ||
    key.includes("not registered")
  ) {
    return `No Starix account uses ${who}.`;
  }
  if (key.includes("invalid email") || key === "invalid") {
    return `${who} is not a valid email address.`;
  }
  if (key.includes("full")) {
    return "This circle is full, so this invitation can't be sent.";
  }
  if (!text) return "This invitation could not be sent.";
  const sentence = /[.!?]$/.test(text) ? text : `${text}.`;
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}

function pushIssues(list: unknown, into: InviteIssue[]) {
  if (!Array.isArray(list)) return;
  for (const item of list) {
    const row = asRecord(item);
    if (!row) {
      const text = readString(item);
      if (text) into.push({ email: "", reason: text });
      continue;
    }
    const email = readString(row.email ?? row.invited_email ?? row.address);
    const reason = readString(
      row.reason ?? row.message ?? row.detail ?? row.msg
    );
    if (email || reason) into.push({ email, reason });
  }
}

function collectIssues(node: unknown, into: InviteIssue[], depth = 0) {
  if (depth > 4) return;
  const record = asRecord(node);
  if (!record) return;

  pushIssues(record.errors, into);
  const detail = record.detail;
  if (Array.isArray(detail)) {
    for (const item of detail) {
      const row = asRecord(item);
      if (!row) continue;
      const loc = Array.isArray(row.loc) ? row.loc : [];
      const email = loc.every((part) => typeof part !== "string" || !part.includes("@"))
        ? ""
        : String(loc.find((part) => typeof part === "string" && part.includes("@")) ?? "");
      const reason = readString(row.msg ?? row.message ?? row.reason);
      if (reason) into.push({ email, reason });
    }
  } else {
    collectIssues(detail, into, depth + 1);
  }
  collectIssues(record.details, into, depth + 1);
}

function topLevelMessage(data: Record<string, unknown> | null) {
  if (!data) return "";
  const detail = data.detail;
  const detailRecord = asRecord(detail);
  return (
    readString(data.message) ||
    readString(detail) ||
    readString(detailRecord?.message) ||
    readString(detailRecord?.detail)
  );
}

function responseBody(error: unknown) {
  const err = asRecord(error);
  const response = asRecord(err?.response);
  return asRecord(response?.data) ?? asRecord(err?.data);
}

export function readCircleInviteFailure(error: unknown, emails: string[]) {
  const data = responseBody(error);
  const issues: InviteIssue[] = [];
  collectIssues(data, issues);

  const filled = emails.map((email) => email.trim()).filter(Boolean);
  const byEmail = new Map<string, string>();

  for (const issue of issues) {
    const message = explainInviteReason(issue.reason, issue.email || filled[0] || "");
    const matched =
      filled.find(
        (email) => email.toLowerCase() === issue.email.trim().toLowerCase()
      ) || (filled.length === 1 && issues.length === 1 ? filled[0] : "");
    if (matched && !byEmail.has(matched.toLowerCase())) {
      byEmail.set(matched.toLowerCase(), explainInviteReason(issue.reason, matched));
    } else if (!matched && message) {
      byEmail.set(`__${byEmail.size}`, message);
    }
  }

  const messages = [...byEmail.values()];
  const fallback = explainInviteReason(topLevelMessage(data), filled.length === 1 ? filled[0] : "");
  const generic =
    fallback.toLowerCase() === "some invitations could not be sent." ||
    fallback.toLowerCase().startsWith("some invitations could not be sent");

  const banner =
    messages.length > 0
      ? messages.join(" ")
      : generic && filled.length === 1
        ? `The invitation to ${filled[0]} could not be sent. Check that this person is not already in the circle.`
        : fallback || "Failed to send invitations.";

  return { banner, byEmail };
}
