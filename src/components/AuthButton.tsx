import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";

import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export function AuthButton() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (!user) {
    return (
      <Button asChild variant="outline" size="default">
        <Link to="/auth">
          <UserRound /> Sign in
        </Link>
      </Button>
    );
  }

  const name =
    (user.user_metadata?.full_name as string | undefined) || user.email || "Account";

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="hidden max-w-40 truncate text-sm font-medium text-muted-foreground lg:block">
        {name}
      </span>
      <Button variant="outline" size="default" onClick={handleSignOut}>
        <LogOut /> Sign out
      </Button>
    </div>
  );
}
