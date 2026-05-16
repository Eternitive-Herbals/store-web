# Admin Dashboard Architecture

The Admin Dashboard is located inside the `app/admin/` directory. It is a secure, protected route group designed for store managers to handle inventory, orders, and content.

## Protection Strategy

Access to the `/admin` routes is restricted. If a user without the `Admin` role attempts to access these pages, they will be redirected to the home page or a 404 page. This is managed via layout checks and API route validation.

## Core Admin Sections

### Catalog Management (`/admin/catalog` & `/admin/products`)
This is the heart of the inventory system.
- **Product Table**: Displays a paginated, sortable list of products.
- **Create/Edit Modals**: Utilizes reusable generic modals (`components/ProductModal.tsx`) to allow admins to input product details (name, price, dosage) and select multi-select properties (Categories, Ingredients, Goals).
- **Metadata Management**: Admins can also create new Categories, Ingredients, and Goals directly from this section.

### Order Processing (`/admin/orders`)
- **Order Table**: Displays all customer orders.
- **Order Details**: Clicking an order opens a detailed modal showing the purchased items, the user's shipping address, and the total transaction value.
- **Status Updates**: Admins can transition orders through their lifecycle (`pending` -> `paid` -> `shipped` -> `delivered`).

### Transactions (`/admin/transactions`)
- Displays a read-only log of all financial transactions that have been successfully verified via Razorpay.

## Reusable Components

The Admin dashboard relies heavily on a bespoke UI component library to maintain consistency:

### 1. The DataTable Ecosystem (`components/DataTable/`)
A highly reusable, type-safe table component powered by `@tanstack/react-table`.
- **`EnhancedTable.tsx`**: The main wrapper that handles pagination, sorting, and global filtering.
- **Columns**: Configurations are passed in as props (e.g., `productActionColumn.tsx`, `orderActionColumn.tsx`) to define how specific data types should be rendered and what action buttons (Edit/Delete) should appear.

### 2. Generic Modals (`components/genericModal/`)
A standardized modal system used for forms and confirmations.
- **`Modal.tsx`**: The base wrapper providing the backdrop, animations (via `framer-motion`), and close logic.
- **Upload Hooks**: Custom hooks like `useImageUpload.ts` and `useProductImagesUpload.ts` are tightly integrated with the modals to provide seamless drag-and-drop S3 uploading experiences while managing state.

### 3. Advanced Inputs (`components/DropdownWithCreate.tsx`)
A custom select component used heavily in product creation. It allows admins to select existing tags (like Categories) or type a new one and create it on the fly without leaving the product form.
