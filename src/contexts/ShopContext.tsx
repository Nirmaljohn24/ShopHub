import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  stock?: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: Address;
  status: 'On Process' | 'Shipped' | 'Delivered';
  date: string;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  addresses: Address[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  addAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  placeOrder: (addressId: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedAddresses = localStorage.getItem('addresses');
    const savedOrders = localStorage.getItem('orders');

    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    if (product.stock === 0) {
      toast({
        title: "Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      });
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    if (product.stock === 0) {
      toast({
        title: "Out of Stock",
        description: "Cannot add out of stock items to wishlist.",
        variant: "destructive",
      });
      return;
    }

    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });

    toast({
      title: "Added to Wishlist",
      description: `${product.title} has been added to your wishlist.`,
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== productId)
    );
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    });
  };

  const addAddress = (address: Address) => {
    setAddresses((prevAddresses) => [...prevAddresses, address]);
    toast({
      title: "Address Added",
      description: "Your address has been saved successfully.",
    });
  };

  const removeAddress = (addressId: string) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((addr) => addr.id !== addressId)
    );
    toast({
      title: "Address Removed",
      description: "Address has been deleted.",
    });
  };

  const placeOrder = (addressId: string) => {
    const address = addresses.find((addr) => addr.id === addressId);
    if (!address || cart.length === 0) {
      toast({
        title: "Error",
        description: "Please select an address and add items to cart.",
        variant: "destructive",
      });
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cart],
      total,
      address,
      status: 'On Process',
      date: new Date().toISOString(),
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]);

    toast({
      title: "Order Placed!",
      description: `Your order #${newOrder.id} has been placed successfully.`,
    });
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast({
      title: "Order Updated",
      description: `Order status updated to ${status}.`,
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        addresses,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        addAddress,
        removeAddress,
        placeOrder,
        updateOrderStatus,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
