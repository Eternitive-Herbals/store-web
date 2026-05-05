# Aethery Store Web

Aethery is a modern, high-performance E-commerce web application built for the health and wellness industry. It features a beautifully designed customer storefront, an intelligent AI concierge chatbot, and a robust admin dashboard for seamless store management.

## 🚀 Features

### Customer Storefront
- **Dynamic Product Catalog**: Browse products based on specific Health Goals, Ingredients, and Categories.
- **Rich Product Pages**: Detailed product views featuring ingredient breakdowns, dosages, and transparent customer reviews.
- **Aethery AI Concierge**: An integrated floating chatbot (powered by Groq API) to answer customer queries in real-time.
- **Cart & Checkout**: A persistent shopping cart with secure checkout powered by **Razorpay**.
- **User Authentication**: Secure user accounts with JWT-based authentication and email OTP verification.
- **Coupons & Discounts**: Dynamic discount code application (percentage or fixed).

### Admin Dashboard
- **Data Management**: Full CRUD capabilities for Products, Orders, Users, Categories, Goals, and Ingredients.
- **Data Tables**: High-performance, sortable, and filterable data tables powered by `@tanstack/react-table`.
- **Media Uploads**: Direct-to-S3 secure image uploads using AWS SDK pre-signed URLs.
- **Order Processing**: Track transactions and manage order statuses (pending, shipped, delivered).

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, v16+)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database**: MongoDB with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens), `jose`, and `bcryptjs`
- **Cloud Storage**: AWS S3 (`@aws-sdk/client-s3`)
- **Payments**: Razorpay
- **AI Integration**: Groq SDK
- **Icons & UI**: Lucide React, Framer Motion, Sonner (Toasts)

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd store-web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the following keys:
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication
   JWT_SECRET=your_jwt_secret_key

   # AWS S3 (for image uploads)
   AWS_REGION=your_aws_region
   AWS_ACCESS_KEY_ID=your_access_key
   AWS_SECRET_ACCESS_KEY=your_secret_key
   AWS_BUCKET_NAME=your_bucket_name

   # Payments
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret

   # AI Integration
   GROQ_API_KEY=your_groq_api_key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000).

## 🗄️ Database Architecture

The application is built on a highly relational MongoDB schema structure:
- **User**: Base model for Customers, Admins, and Distributors.
- **Product**: Links to `Ingredient`, `Category`, and `Goal` collections.
- **Order & Transaction**: Tracks financial exchanges and embeds `OrderItem`s for immutable historical records.
- **Review**: Associates user feedback directly with `Product`s.
- **Cart & Coupon**: Manages active shopping sessions and promotional pricing.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 License
This project is proprietary and confidential.
