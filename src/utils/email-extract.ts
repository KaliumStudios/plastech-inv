export function extractUsernameFromEmail(email: string | null) {
  return email?.split("@")[0] ?? "";
}