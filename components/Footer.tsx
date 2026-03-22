import { Copyright, Instagram, LucideFacebook, Twitter } from "lucide-react";
import Image from "next/image";
import FooterFirstImage from "@/assets/spiral_footer.svg";
import FooterSecondImage from "@/assets/footer_aethery.svg";

const Footer = async () => {
  const contactUs: string[] = [
    "Contact Us",
    "Adress",
    "aethery@gmail.com",
    "+0000000000",
  ];

  const policy: string[] = [
    "Privacy Policy",
    "Terms & Conditions",
    "Refund & Return Policy",
    "Help Center",
  ];

  return (
    <div className="bg-primary-background relative flex h-dvh snap-start flex-col py-24">
      <Image
        src={FooterFirstImage}
        alt="footer spiral"
        fill
        className="z-0 object-cover"
      />

      <div className="text-nav-foreground relative z-10 my-auto flex w-full items-start justify-around gap-8 pt-24 text-left text-sm font-extralight">
        <div className="space-y-4">
          {contactUs.map((contact, idx) => (
            <div key={idx} className="hover:text-blue-500">
              {contact}
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {policy.map((policy, idx) => (
            <div key={idx} className="hover:text-blue-500">
              {policy}
            </div>
          ))}
        </div>

        <div className="space-y-4 pr-12">
          <h1>Stay Connected</h1>
          <div className="flex items-center gap-6">
            <LucideFacebook size={24} />
            <Instagram size={24} />
            <Twitter size={24} />
          </div>
        </div>
      </div>

      <h1 className="text-nav-foreground mx-auto flex items-center gap-2 pt-32 text-sm font-extralight">
        <Copyright size={16} />
        aethery. 2018 All rights reserved.
      </h1>

      <div className="relative top-24 z-0">
        <Image
          alt="footer_aethery"
          src={FooterSecondImage}
          height={100}
          width={100}
          className="mx-auto w-fit"
        />
      </div>
    </div>
  );
};

export default Footer;
