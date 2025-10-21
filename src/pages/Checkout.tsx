import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useShop } from '@/contexts/ShopContext';
import { useAuth } from '@/contexts/AuthContext';
import { Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, addresses, addAddress, placeOrder } = useShop();
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.street || !newAddress.city) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const address = {
      ...newAddress,
      id: Date.now().toString(),
    };
    addAddress(address);
    setSelectedAddress(address.id);
    setShowAddressForm(false);
    setNewAddress({
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
    });
  };

  const handlePlaceOrder = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You must be signed in to place an order.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedAddress) {
      toast({
        title: "Select an address",
        description: "Please select a delivery address.",
        variant: "destructive",
      });
      return;
    }

    placeOrder(selectedAddress);
    navigate('/dashboard');
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {addresses.length > 0 && (
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                    {addresses.map((address) => (
                      <div key={address.id} className="flex items-start space-x-2">
                        <RadioGroupItem value={address.id} id={address.id} />
                        <Label htmlFor={address.id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{address.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {address.street}, {address.city}, {address.state} {address.zip}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Phone: {address.phone}
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {!showAddressForm ? (
                  <Button
                    variant="outline"
                    onClick={() => setShowAddressForm(true)}
                    className="w-full"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                  </Button>
                ) : (
                  <div className="space-y-4 border rounded-lg p-4">
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={newAddress.name}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="street">Street Address *</Label>
                        <Input
                          id="street"
                          value={newAddress.street}
                          onChange={(e) =>
                            setNewAddress({ ...newAddress, street: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={newAddress.city}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, city: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={newAddress.state}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, state: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input
                            id="zip"
                            value={newAddress.zip}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, zip: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={newAddress.phone}
                            onChange={(e) =>
                              setNewAddress({ ...newAddress, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddAddress}>Save Address</Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowAddressForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded bg-secondary"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handlePlaceOrder}
                  className="w-full"
                  size="lg"
                  disabled={!selectedAddress || !user}
                >
                  Place Order
                </Button>
                {!user && (
                  <p className="text-sm text-center text-muted-foreground">
                    Please sign in to place order
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
