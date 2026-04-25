"use client";
import Image from "next/image";
import GoogleImage from "@/assets/Google_G_logo.svg";
import { useRef, useState } from "react";
import Link from "next/link";
import { CheckSquare2, Eye, EyeClosed, Square } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const checkboxRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { refreshUser } = useAuth();
  async function handleLogin() {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (!res.ok) {
      
        alert(data.message);
        return;
      }
      await refreshUser();
      setLoading(false);
if(data.user === "admin"){
  router.push("/admin/products");
  router.refresh();
  return;
}
      router.push("/");
      router.refresh();
      
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, type, checked, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        <span className="font-comfortaa text-4xl tracking-wider text-[#030303]">
          WELCOME
        </span>
        <span className="text-lg text-[#636364]">
          Please enter your details.
        </span>
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-4 px-4">
        <label htmlFor="email" className="flex w-full flex-col gap-1">
          <span className="w-fit text-lg text-[#181818]">Email</span>
          <input
            type="email"
            name="email"
            id="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            className="bg-background-light focus:outline-background-lightest placeholder: w-full rounded-2xl border border-[#C4C4C4] px-4 py-2 outline-2 outline-offset-0 outline-transparent transition-all placeholder:text-[#9D9D9E]"
          />
        </label>

        <label htmlFor="password" className="flex w-full flex-col gap-1">
          <span className="w-fit text-lg text-[#181818]">Password</span>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="bg-background-light focus:outline-background-lightest placeholder: w-full rounded-2xl border border-[#C4C4C4] px-4 py-2 pr-10 outline-2 outline-offset-0 outline-transparent transition-all placeholder:text-[#9D9D9E]"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:opacity-75 active:opacity-50"
            >
              {showPassword ? (
                <Eye size={22} className="text-[#9D9D9E]" />
              ) : (
                <EyeClosed size={22} className="text-[#9D9D9E]" />
              )}
            </button>
          </div>
        </label>

        <div className="flex w-full justify-between">
          <label htmlFor="remember-me" className="flex items-center gap-2">
            <input
              type="checkbox"
              ref={checkboxRef}
              checked={loginData.rememberMe}
              onChange={handleChange}
              name="rememberMe"
              id="remember-me"
              className="hidden text-[#C4C4C4]"
            />
            <button type="button" onClick={() => checkboxRef.current?.click()}>
              {loginData.rememberMe ? (
                <CheckSquare2 size={18} className="cursor-pointer" />
              ) : (
                <Square size={18} className="cursor-pointer" />
              )}
            </button>
            <span className="text-[#181818]">Remember Me</span>
          </label>
          <Link
            href={"/forgot-password"}
            className="transition-all hover:opacity-75 active:opacity-50"
          >
            <span className="text-[#181818]">Forgot Password?</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center rounded-2xl bg-[#1B1B1B] px-3 py-1.75 transition-all hover:opacity-90 active:opacity-75 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="text-lg text-white">Log In</span>
        </button>

        <span className="text-lg">OR</span>

        <button
          disabled={loading}
          className="shadow-foreground/25 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#747775] bg-white px-3 py-1.5 transition-all hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <Image src={GoogleImage} alt="Google-G-Logo" className="size-6" />
          <span className="text-lg text-black">Sign in with Google</span>
        </button>

        <p className="flex gap-1 text-[#595959]">
          Don&apos;t have an account?
          <Link
            className="hover:decoration-foreground cursor-pointer text-[#1B1B1B] underline decoration-transparent underline-offset-2 transition-all active:opacity-75"
            href={"/signup"}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
