import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import logo from "@/assets/trinity-logo.png.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Sign In | Trinity Tax Consultants Inc." },
      {
        name: "description",
        content:
          "Sign in or create your Trinity Tax Consultants client account.",
      },
      { property: "og:title", content: "Sign In | Trinity Tax Consultants Inc." },
      {
        property: "og:description",
        content: "Access your Trinity Tax Consultants client account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function GoogleLogo() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
      />
    </svg>
  );
}

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  const handleGoogle = async () => {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      toast.error("Google sign-in failed. Please try again.");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/" });
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { full_name: fullName },
        },
      });
      setBusy(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      if (!data.session) {
        setConfirmSent(true);
        return;
      }
      navigate({ to: "/" });
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-lift)]">
        <div className="mb-6 flex flex-col items-center text-center">
          <img src={logo.url} alt="Trinity Tax Consultants Inc. logo" className="size-14" />
          <h1 className="mt-3 font-display text-2xl font-semibold">
            {confirmSent
              ? "Check your email"
              : mode === "signin"
                ? "Welcome back"
                : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {confirmSent
              ? "We sent you a confirmation link. Click it to finish creating your account."
              : "Trinity Tax Consultants client account"}
          </p>
        </div>

        {confirmSent ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              Sent to <span className="font-medium text-foreground">{email}</span>. After
              confirming, you can sign in.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setConfirmSent(false);
                setMode("signin");
              }}
            >
              Back to sign in
            </Button>
          </div>
        ) : (
          <>
            <Button
              type="button"
              onClick={handleGoogle}
              disabled={busy}
              className="w-full border border-[#747775] bg-white font-medium text-[#1F1F1F] hover:bg-[#f6f6f6]"
            >
              <GoogleLogo />
              Continue with Google
            </Button>

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wide text-muted-foreground">or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={handleEmail} className="space-y-4">
              {mode === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  minLength={6}
                  required
                />
              </div>
              <Button type="submit" variant="gold" className="w-full" disabled={busy}>
                {busy ? "Please wait..." : mode === "signin" ? "Sign in" : "Create account"}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              {mode === "signin" ? "New to Trinity?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="font-medium text-accent hover:underline"
              >
                {mode === "signin" ? "Create an account" : "Sign in"}
              </button>
            </p>
          </>
        )}

        <p className="mt-6 text-center">
          <a href="/" className="text-xs text-muted-foreground hover:text-foreground">
            ← Back to trinitytaxlv.app
          </a>
        </p>
      </div>
    </div>
  );
}
