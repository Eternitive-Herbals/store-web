"use client";
import Image from "next/image";
import BgImage from "@/assets/BgImage.jpg";
import OurProd from "@/assets/our_prod.svg";
import GoogleImage from "@/assets/Google_G_logo.svg";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {

      const res = await fetch('/api/login',{
        method: "POST",
        headers:{
          "content-type":"application/json"
        },
        body: JSON.stringify({
          email,
          password,
        })
      })
      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }
     
      router.push('/');
      router.refresh()
      
    } catch (error) {

      console.error("Login error:", error);
    }
  }



  return (
    <div className="flex min-h-screen w-full gap-23">
      <div className="relative w-216.75">
        <Image
          src={BgImage}
          alt="Product"
          fill
          className="rounded-tr-4xl rounded-br-4xl object-cover"
        />
        <div
          className="absolute inset-0 rounded-tr-4xl rounded-br-4xl"
          style={{
            background:
              "radial-gradient(58.59% 43.45% at 74.97% 35.25%, rgba(0,2,9,0) 0%, rgba(0,2,9,0.4) 50%, rgba(0,2,9,0.8) 100%)",
          }}
        />
      </div>

      <Image
        src={OurProd}
        alt="background"
        fill
        className="-z-10 h-256 w-216.75 object-cover"
      />

      <div className="flex h-124 w-99.25 flex-col gap-6 pt-30">
        <div className="flex flex-col items-center">
          <span className="font-sf-pro-text text-5xl text-[#030303]">
            WELCOME
          </span>
          <span className="text-md text-[#636364]">
            Welcome! Please enter your details.
          </span>
        </div>
        <div className="flex flex-col items-center gap-6">
          <label
            htmlFor="email"
            className="flex h-17.75 w-99.25 flex-col gap-1"
          >
            <span className="text-md font-sf-pro-text w-fit text-[#181818]">
              Email
            </span>
            <input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="Enter email or username"
              autoComplete="email"
              className="bg-background-light focus:outline-background-lightest w-full rounded-2xl border border-[#C4C4C4] px-4 py-2 outline-2 outline-offset-0 outline-transparent transition-all placeholder:text-sm placeholder:text-[#9D9D9E]"
            />
          </label>
          <label htmlFor="password" className="flex w-99.25 flex-col gap-1">
            <span className="text-md font-sf-pro-text w-fit text-[#181818]">
              Password
            </span>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                className="bg-background-light focus:outline-background-lightest w-full rounded-2xl border border-[#C4C4C4] px-4 py-2 pr-10 outline-2 outline-offset-0 outline-transparent transition-all placeholder:text-sm placeholder:text-[#9D9D9E]"
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
            <label
              htmlFor="remember-me"
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                name="rememberMe"
                id="remember-me"
                className="cursor-pointer text-[#C4C4C4]"
              />
              <span className="text-sm text-[#181818]">Remember Me</span>
            </label>
            <Link
              href={"/forgot-password"}
              className="transition-all hover:opacity-75 active:opacity-50"
            >
              <span className="text-sm text-[#181818]">Forgot Password?</span>
            </Link>
          </div>
          <button onClick={handleLogin}className="flex w-full cursor-pointer items-center justify-center rounded-2xl bg-[#1B1B1B] py-3">
            <span className="font-sf-pro-text text-sm text-white">Log In</span>
          </button>

          <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-[#C4C4C4] py-1">
            <Image src={GoogleImage} alt="Google-G-Logo" className="size-7" />
            <span className="font-sf-pro-text text-sm text-black">
              Sign in with Google
            </span>
          </button>
          <p className="flex gap-1 text-sm text-[#595959]">
            Don’t have an account?
            <Link
              className="cursor-pointer text-sm text-[#1B1B1B]"
              href={"/signup"}
            >
              Sign up fo free!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
