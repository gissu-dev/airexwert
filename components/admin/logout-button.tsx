export function LogoutButton() {
  return (
    <form action="/api/auth/logout" method="post">
      <button
        type="submit"
        className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
      >
        Log out
      </button>
    </form>
  );
}