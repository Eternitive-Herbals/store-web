# Frontend State Management

The frontend utilizes React Context to maintain global state for critical application features: Authentication and the Shopping Cart.

## Authentication Context (`context/AuthContext.tsx`)

The `AuthContext` provides global access to the current user's session state without needing to prop-drill.

### Key Capabilities:
- **`user` State**: Holds the current user object (from the `/api/auth/me` endpoint) or `null` if unauthenticated.
- **`loading` State**: A boolean indicating if the initial session check is still in progress (useful for preventing layout shifts).
- **`login(email, password)`**: Makes a request to `/api/auth/login`. On success, it triggers a refetch of the user profile.
- **`register(userData)`**: Makes a request to `/api/auth/register`. On success, it automatically logs the user in.
- **`logout()`**: Calls `/api/auth/logout` to clear the HTTP-only cookie and resets the local `user` state to `null`.

### Usage:
Wrap parts of your app needing auth in the provider. Use the custom hook `useAuth()` to access the context:
```tsx
import { useAuth } from '@/context/AuthContext';

const { user, logout, loading } = useAuth();
if (!user) return <LoginPrompt />;
```

## Cart Context (`context/CartContext.tsx`)

The `CartContext` ensures that the shopping cart is synced across all tabs and components (like the navigation badge and the checkout page).

### Key Capabilities:
- **`cart` State**: Holds the current array of cart items.
- **`cartTotal` State**: A computed value of the total cost of items in the cart.
- **`addToCart(product)`**: Calls the `/api/cart` endpoint to persist the item, then updates the local state.
- **`removeFromCart(productId)`**: Calls `/api/cart/[id]` (DELETE) and updates the local state.
- **`updateQuantity(productId, quantity)`**: Calls `/api/cart/[id]` (PUT) to adjust amounts.
- **`clearCart()`**: Wipes the cart locally and in the database (typically called after a successful order).

### Usage:
Access the cart via the `useCart()` hook:
```tsx
import { useCart } from '@/context/CartContext';

const { cart, addToCart, cartTotal } = useCart();
```

## Why React Context instead of Redux/Zustand?
For an e-commerce platform of this scale, React Context combined with the built-in hooks (`useState`, `useEffect`) provides sufficient power without the heavy boilerplate of Redux. The data structure for the cart and user session is relatively flat and doesn't suffer from significant performance degradation due to re-renders.
