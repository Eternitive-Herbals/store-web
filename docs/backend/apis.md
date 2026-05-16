# Backend API Routes

Aethery utilizes Next.js Serverless API Routes (found in `app/api/`) to handle all backend logic. 

## Authentication (`/api/auth`)
Handles user registration, login, and session validation using JWTs stored in HTTP-only cookies.

- **`POST /api/auth/register`**: Creates a new user. Hashes the password using `bcryptjs`.
- **`POST /api/auth/login`**: Authenticates a user. Issues a JWT using `jose` and sets it as an HTTP-only cookie.
- **`GET /api/auth/me`**: Returns the current authenticated user's profile based on the JWT cookie.
- **`POST /api/auth/logout`**: Clears the authentication cookie.

## AWS S3 Uploads (`/api/s3-upload`)
Handles secure, direct-to-S3 file uploading using Pre-signed URLs.

- **`POST /api/s3-upload`**: 
  - **Payload**: `{ "fileType": "image/png" }`
  - **Action**: Generates a temporary `signedUrl` via `@aws-sdk/s3-request-presigner` giving the client permission to upload exactly one file to a specific key.
  - **Returns**: `{ signedUrl, fileUrl }`
- **`DELETE /api/s3-upload`**:
  - **Payload**: `{ "fileUrl": "https://..." }`
  - **Action**: Deletes the specified object from the S3 bucket.

## E-Commerce Core

### Products (`/api/products`)
- **`GET /api/products`**: Retrieves a list of products. Supports pagination and filtering.
- **`POST /api/products`**: (Admin only) Creates a new product.
- **`GET /api/products/[id]`**: Retrieves details for a specific product.
- **`PUT /api/products/[id]`**: (Admin only) Updates a product.
- **`DELETE /api/products/[id]`**: (Admin only) Deletes a product.

### Cart (`/api/cart`)
- **`GET /api/cart`**: Retrieves the current user's active cart.
- **`POST /api/cart`**: Adds an item to the cart or increments its quantity.
- **`PUT /api/cart/[id]`**: Updates the quantity of a specific item in the cart.
- **`DELETE /api/cart/[id]`**: Removes an item from the cart entirely.

### Orders (`/api/orders` & `/api/order`)
- **`GET /api/orders`**: Retrieves a list of all orders (Admin view).
- **`GET /api/order`**: Retrieves orders for the currently authenticated user.
- **`POST /api/order`**: Creates a new pending order from the user's cart.
- **`PUT /api/orders/[id]`**: (Admin only) Updates an order's status (e.g., to `shipped` or `delivered`).

## Payments (`/api/payment/razorpay`)
Integrates with the Razorpay payment gateway.

- **`POST /api/payment/razorpay/order`**: Calls the Razorpay API to generate a new order ID required by the frontend checkout widget.
- **`POST /api/payment/razorpay/verify`**: Receives the payment signature from the client after a successful transaction. Verifies the signature using `crypto.createHmac` and the Razorpay secret key. If valid, updates the internal `Order` status to `paid` and creates a `Transaction` record.

## Catalog Metadata
CRUD operations for product metadata categories (Admin operations are protected).
- **`/api/category`**: Manage product categories.
- **`/api/goal`**: Manage health/fitness goals.
- **`/api/ingredients`**: Manage active ingredients.

## Content & Community
- **`/api/blog`**: Create, read, update, delete blog posts.
- **`/api/review`**: Submit and fetch product reviews.
- **`/api/coupon`**: Admin routes to manage discount codes.
- **`/api/contact`**: Receives submissions from the Contact Us form.
