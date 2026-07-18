
import "@/app/globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";



export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
     
   
  
}
