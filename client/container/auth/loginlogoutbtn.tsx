"use client";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { signout } from "@/lib/auth-action";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";

const LoginButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = createClient();
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  if (user) {
    return (
      <Button
        onClick={() => {
          signout();
          setUser(null);
        }}
      >
        Log out
      </Button>
    );
  }
  return (
    <Button
      variant="outline"
      onClick={() => {
        router.push("/auth");
      }}
    >
      Login
    </Button>
  );
};

export default LoginButton;
