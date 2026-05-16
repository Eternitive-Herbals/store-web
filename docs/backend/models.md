# Database Models

The application connects to a MongoDB database. The data models are defined using [Mongoose](https://mongoosejs.com/) and are located in the `/models` directory.

## Core Entities

### User (`models/User.ts`)
The `User` model handles both standard customers and administrators.
- **Key Fields**: `username`, `email`, `password` (hashed), `role` (`Customer`, `Admin`, `Distributer`), `mobile`.
- **Relationships**: 
  - `primaryAddress`: References the `Address` model.

### Address (`models/Address.ts`)
Stores shipping/billing addresses for users.
- **Key Fields**: `fullName`, `phone`, `addressLine1`, `city`, `state`, `pincode`, `country`, `isDefault`.
- **Relationships**:
  - `userId`: References the `User` who owns the address.

### Product (`models/Product.ts`)
The central entity for the storefront.
- **Key Fields**: `name`, `description`, `price`, `dosage`, `images` (array of S3 URLs, max 4).
- **Relationships**:
  - `category`: Array of references to `Category`.
  - `ingredients`: Array of references to `Ingredient`.
  - `goal`: Array of references to `Goal`.

### Category, Ingredient, Goal (`models/Category.ts`, `models/Ingredient.ts`, `models/Goal.ts`)
These are lookup tables/collections used to tag and filter products.
- Each typically contains a `name`, and optionally a `description` and `image` (S3 URL).

## Transactions & Shopping

### Cart (`models/Cart.ts`)
Represents a user's active shopping session.
- **Key Fields**: `userId` (references `User`).
- **Embedded Document**: `items` (array of `CartItemSchema`).
  - `CartItemSchema`: Stores `productId`, `title`, `price`, `image`, `description`, and `quantity` directly in the cart to avoid complex joins during checkout.

### Order (`models/Order.ts`)
Created when a user successfully checks out.
- **Key Fields**: `totalAmount`, `shippingAddress`, `status` (`pending`, `paid`, `failed`, `delivered`, `shipped`).
- **Relationships**:
  - `user`: References `User`.
- **Embedded Document**: `items` (array of `OrderItemSchema`).
  - `OrderItemSchema`: Stores a reference to `product` along with the purchased `quantity`, `price`, and item-level `status`.

### Transaction (`models/Transaction.ts`)
Records the financial transaction associated with an order, primarily used when integrating with Razorpay.
- **Key Fields**: `amount`, `paymentMethod` (`card`, `upi`, `netbanking`, `cod`).
- **Relationships**:
  - `user`: References `User`.
  - `order`: References `Order`.

### Coupon (`models/Coupon.ts`)
Allows admins to create discount codes.
- **Key Fields**: `code`, `discountType` (`percentage`, `fixed`), `discountValue`, `minOrderValue`, `maxDiscountAmount`, `validFrom`, `validUntil`, `usageLimit`, `usedCount`, `isActive`.

## Community & Content

### Review (`models/Review.ts`)
User-submitted feedback for products.
- **Key Fields**: `author`, `rating`, `content`, `image`.
- **Relationships**: `productId` (references `Product`).

### Blog (`models/Blog.ts`)
Content managed by admins to engage users.
- **Key Fields**: `title`, `content`, `image`, `postedDate`.
