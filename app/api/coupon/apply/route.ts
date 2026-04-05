import connectDB  from "@/lib/db";
import { Coupon } from "@/models/Coupon";

export async function POST(req: Request) {
  try {
    await connectDB(); 

    const { code, cartTotal } = await req.json();

    if (!code || !cartTotal) {
      return Response.json({
        success: false,
        message: "Invalid request",
      });
    }

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
    });

    if (!coupon) {
      return Response.json({
        success: false,
        message: "Invalid coupon code",
      });
    }

    if (!coupon.isActive) {
      return Response.json({
        success: false,
        message: "Coupon inactive",
      });
    }

    if (new Date() > coupon.validUntil) {
      return Response.json({
        success: false,
        message: "Coupon expired",
      });
    }

    if (
      coupon.usageLimit != null &&
      coupon.usedCount >= coupon.usageLimit
    ) {
      return Response.json({
        success: false,
        message: "Coupon usage limit reached",
      });
    }

    if (cartTotal < coupon.minOrderValue) {
      return Response.json({
        success: false,
        message: "Minimum order not met",
        minimumOrder: coupon.minOrderValue,
      });
    }

    let discount = 0;

    if (coupon.discountType === "percentage") {
      discount = (cartTotal * coupon.discountValue) / 100;

      if (coupon.maxDiscountAmount) {
        discount = Math.min(discount, coupon.maxDiscountAmount);
      }
    } else {
      discount = coupon.discountValue;
    }

    const finalTotal = Math.max(cartTotal - discount, 0);

    coupon.usedCount += 1;
    await coupon.save();

    return Response.json({
      success: true,
      discount,
      finalTotal,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: "Server error",
    });
  }
}