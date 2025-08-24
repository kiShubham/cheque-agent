"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { SignupFormData } from "@/container/auth/auth-form/signup-form";

export async function login(data: { email: string; password: string }) {
  const supabase = createClient();
  const { error } = await (await supabase).auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(data: SignupFormData) {
  const supabase = createClient();
  const firstName = data.firstName;
  const lastName = data.lastName;
  const payload = {
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: `${firstName + " " + lastName}`,
        email: data.email,
      },
    },
  };

  const { error } = await (await supabase).auth.signUp(payload);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signout() {
  const supabase = createClient();
  const { error } = await (await supabase).auth.signOut();
  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect("/logout");
}

export async function signInWithGoogle() {
  const supabase = createClient();
  const { data, error } = await (
    await supabase
  ).auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.log(error);
    redirect("/error");
  }

  redirect(data.url);
}
