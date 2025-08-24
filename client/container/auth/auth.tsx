"use client";

import { Merge } from "lucide-react";
import {
  TextureCardContent,
  // TextureCardFooter,
  TextureCardHeader,
  TextureCardStyled,
  TextureCardTitle,
  TextureSeparator,
} from "@/components/ui/texture-card";
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-action";
import SignupForm from "./auth-form/signup-form";
import { useState } from "react";
import LoginForm from "./auth-form/login-form";

export function AuthenticationCard() {
  const [formType, setFormType] = useState<"sign-up" | "login">("sign-up");

  return (
    <div className="flex items-center justify-center">
      <div className="dark:bg-stone-950  h-full    rounded-md">
        <div className=" items-start justify-center gap-6 rounded-lg p-2 md:p-8 grid grid-cols-1 ">
          <div className="col-span-1 grid items-start gap-6 lg:col-span-1">
            <div>
              <TextureCardStyled>
                <TextureCardHeader className="flex flex-col gap-1 items-center justify-center p-4">
                  <div className="p-3 bg-neutral-950 rounded-full mb-3">
                    <Merge className="h-7 w-7 stroke-neutral-200" />
                  </div>
                  <TextureCardTitle>Create your account</TextureCardTitle>
                  <p className="text-center text-sm">
                    Welcome! Please fill in the details to get started.
                  </p>
                </TextureCardHeader>
                <TextureSeparator />

                <TextureCardContent>
                  <div className="flex justify-center gap-2 mb-4">
                    <Button
                      variant={"ghost"}
                      className="w-full bg-gray-200 cursor-pointer"
                      type="button"
                      onClick={signInWithGoogle}
                    >
                      <svg
                        width="256"
                        height="262"
                        viewBox="0 0 256 262"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                        className="h-5 w-5"
                      >
                        <path
                          d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                          fill="#4285F4"
                        />
                        <path
                          d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                          fill="#34A853"
                        />
                        <path
                          d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                          fill="#FBBC05"
                        />
                        <path
                          d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                          fill="#EB4335"
                        />
                      </svg>
                      <span className="pl-2">Google</span>
                    </Button>
                  </div>
                  <div className="text-center text-sm mb-4">or</div>
                  {formType === "sign-up" ? <SignupForm /> : <LoginForm />}
                </TextureCardContent>
                <div className="dark:bg-neutral-800 bg-stone-100 pt-px rounded-b-[20px] overflow-hidden ">
                  <div className="flex flex-col items-center justify-center">
                    <div className="py-2 px-2">
                      {formType === "sign-up" ? (
                        <div className="text-center text-sm">
                          Already have an account?
                          <Button
                            variant={"link"}
                            className="text-gray"
                            onClick={() => setFormType("login")}
                          >
                            Sign In
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center text-sm">
                          New here ?
                          <Button
                            variant={"link"}
                            className="text-gray"
                            onClick={() => setFormType("sign-up")}
                          >
                            Sign up
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <TextureSeparator />
                  <div className="flex flex-col items-center justify-center ">
                    <div className="py-2 px-2">
                      <div className="text-center text-xs ">
                        Secured by supabase
                      </div>
                    </div>
                  </div>
                </div>
              </TextureCardStyled>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
