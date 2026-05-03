"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getUserAddresses } from "@/lib/addressAction";
import { MapPinHouse, CheckCircle2, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Script from "next/script";

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [discount, setDiscount] = useState<number>(0); // Implement discount logic if needed
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      fetchCartAndAddresses();
    } else if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user]);

  const fetchCartAndAddresses = async () => {
    try {
      setLoading(true);
      // Fetch Cart
      const cartRes = await fetch("/api/cart", { cache: "no-store" });
      const cartData = await cartRes.json();
      if (cartData.cart) setCart(cartData.cart);

      // Fetch Addresses
      const addressData = await getUserAddresses();
      setAddresses(addressData.addresses || []);
      
      if (addressData.primaryAddress) {
        setSelectedAddressId(addressData.primaryAddress);
      } else if (addressData.addresses?.length > 0) {
        setSelectedAddressId(addressData.addresses[0]._id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load checkout details");
    } finally {
      setLoading(false);
    }
  };

  const subTotal = cart.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0);
  const finalTotal = subTotal - discount;

  const handleRazorpayPayment = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a shipping address");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setProcessing(true);
    try {
      // 1. Find selected address
      const selectedAddr = addresses.find((a) => a._id === selectedAddressId);
      const formattedAddress = `${selectedAddr.fullName}, ${selectedAddr.phone}, ${selectedAddr.addressLine1}, ${selectedAddr.city}, ${selectedAddr.state}, ${selectedAddr.country} - ${selectedAddr.pincode}`;

      // 2. Create Order in DB (Pending)
      const orderRes = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map(item => ({ product: item.productId || item._id, quantity: item.quantity, price: item.price })),
          totalAmount: finalTotal,
          shippingAddress: formattedAddress,
        }),
      });
      const orderData = await orderRes.json();
      
      if (!orderRes.ok) throw new Error(orderData.message || "Failed to create order");
      const orderId = orderData.order._id;

      // 3. Create Razorpay Order
      const rzpRes = await fetch("/api/payment/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal }),
      });
      const rzpOrder = await rzpRes.json();

      if (!rzpRes.ok) throw new Error(rzpOrder.error || "Failed to initialize payment");

      // 4. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder", // Replace with actual Key ID
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
        name: "Eternitive Herbals",
        description: "Checkout Payment",
        order_id: rzpOrder.id,
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...", { id: "payment" });
            const verifyRes = await fetch("/api/payment/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok) {
              toast.success("Payment successful!", { id: "payment" });
              router.push("/account"); // Or an order success page
            } else {
              toast.error(verifyData.message || "Payment verification failed", { id: "payment" });
            }
          } catch (err) {
            toast.error("An error occurred during verification", { id: "payment" });
          }
        },
        prefill: {
          name: selectedAddr.fullName,
          email: user?.email || "",
          contact: selectedAddr.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any){
         toast.error(response.error.description);
      });
      rzp.open();

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong during checkout");
    } finally {
      setProcessing(false);
    }
  };

  if (loading || authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Loader2 className="animate-spin text-primary-background" size={48} />
      </div>
    );
  }

  return (
    <>
      {/* Load Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="min-h-screen bg-[#F9F8F6] px-[calc(100dvw/24)] pt-32 pb-20 font-sf-pro-text">
        <Link href="/cart" className="flex items-center gap-2 text-gray-500 hover:text-black mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Cart
        </Link>
        
        <h1 className="text-3xl font-bold text-primary-background mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
          
          {/* Left Column: Addresses */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Shipping Address</h2>
                <Link href="/account" className="text-blue-600 hover:text-blue-800 text-sm font-medium underline">
                  Manage Addresses
                </Link>
              </div>

              {addresses.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                  <p className="text-gray-500 mb-4">You have no saved addresses.</p>
                  <Link href="/account" className="bg-primary-background text-white px-6 py-2 rounded-full font-medium transition-transform hover:scale-105">
                    Add Address
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <label 
                      key={address._id} 
                      className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${selectedAddressId === address._id ? 'border-primary-background bg-primary-background/5' : 'border-gray-100 hover:border-gray-200 bg-white'}`}
                    >
                      <input 
                        type="radio" 
                        name="address" 
                        value={address._id} 
                        checked={selectedAddressId === address._id}
                        onChange={() => setSelectedAddressId(address._id)}
                        className="mt-1 w-5 h-5 text-primary-background"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-lg">{address.fullName}</span>
                          {user?.primaryAddress === address._id && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                              <CheckCircle2 size={12} /> Primary
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Phone: {address.phone}</p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {address.addressLine1} {address.addressLine2 ? `, ${address.addressLine2}` : ''}<br/>
                          {address.city}, {address.state}<br/>
                          {address.country} - {address.pincode}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="h-fit bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-semibold">Order Summary</h2>
            
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b border-gray-50 pb-4">
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-100">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 64px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-medium text-black">FREE</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-primary-background">₹{finalTotal > 0 ? finalTotal : 0}</span>
              </div>

              <button
                onClick={handleRazorpayPayment}
                disabled={processing || cart.length === 0 || !selectedAddressId}
                className="w-full bg-primary-background text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {processing ? <Loader2 className="animate-spin" size={24} /> : "Pay with Razorpay"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
