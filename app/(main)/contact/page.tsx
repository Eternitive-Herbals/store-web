"use client";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import BackgroundTexture from "../../../assets/background-texture-white-2.svg"; 

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const phonenumber = (formData.get("phonenumber") as string).trim();
    const message = (formData.get("message") as string).trim();

    if (!email && !phonenumber) {
      toast.error("Please enter either Email or Phone Number");
      setLoading(false);
      return;
    }
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, phonenumber, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Something went wrong");
        return;
      }

      toast.success("Thank you, We will Reply to you Shortly.");
      e.currentTarget.reset();
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen  bg-white px-[calc(100dvw/24)] pt-41 pb-20 overflow-y-auto">
     
      <div className="font-sf-pro-text mx-auto max-w-2xl z-10 relative">
        <div className="rounded-4xl bg-[#F9F8F6] p-8 md:p-12 mb-20">
          <div className="border-primary-background/20 mb-8 border-b pb-6 text-center">
            <h1 className="text-primary-background text-3xl font-semibold">Contact Us</h1>
            <p className="mt-2 text-[#6A7282]">We'd love to hear from you. Please fill out the form below.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-primary-background text-lg font-medium">Name <span className="text-red-500">*</span></label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                className="border-primary-background/20 focus:border-primary-background/50 rounded-2xl border bg-white p-4 placeholder:text-gray-400 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-primary-background text-lg font-medium">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="border-primary-background/20 focus:border-primary-background/50 rounded-2xl border bg-white p-4 placeholder:text-gray-400 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="phonenumber" className="text-primary-background text-lg font-medium">Phone Number</label>
              <input
                id="phonenumber"
                type="tel"
                name="phonenumber"
                placeholder="Enter your phone number"
                className="border-primary-background/20 focus:border-primary-background/50 rounded-2xl border bg-white p-4 placeholder:text-gray-400 focus:outline-none focus:ring-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-primary-background text-lg font-medium">Message <span className="text-red-500">*</span></label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Write your message here"
                className="border-primary-background/20 focus:border-primary-background/50 rounded-2xl border bg-white p-4 placeholder:text-gray-400 focus:outline-none focus:ring-0 resize-none"
              />
            </div>

            <button 
              disabled={loading}
              className="bg-primary-background mt-4 flex w-full items-center justify-center gap-2 rounded-full p-4 text-xl font-medium text-white transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              {loading && <Loader2 className="animate-spin" size={24} />}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
       <Image
        src={BackgroundTexture}
        alt="Background Texture" 
        fill
        sizes="100vw"
        className="fixed inset-0 object-cover"
      />
    </div>
  );
}
