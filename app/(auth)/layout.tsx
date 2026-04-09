import Image from "next/image";
import BackgroundTexture from "@/assets/background-texture-brown-1.svg";
import BgImage from "@/assets/BgImage.jpg";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative flex min-h-screen">
      <Image
        src={BackgroundTexture}
        alt="background texture"
        fill
        className="-z-10 object-cover opacity-5"
      />

      <div className="relative flex-1">
        <Image src={BgImage} alt="Product" fill className="object-cover" />
        <div
          className="absolute inset-0 rounded-tr-4xl rounded-br-4xl"
          style={{
            background:
              "radial-gradient(58.59% 43.45% at 74.97% 35.25%, rgba(0,2,9,0) 0%, rgba(0,2,9,0.4) 50%, rgba(0,2,9,0.8) 100%)",
          }}
        />
      </div>

      {children}
    </main>
  );
}
