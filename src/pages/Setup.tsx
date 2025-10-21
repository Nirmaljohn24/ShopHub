import Navbar from '@/components/Navbar';
import FirebaseSetup from '@/components/FirebaseSetup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Setup = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to ShopHub! 🎉</h1>
            <p className="text-xl text-muted-foreground">
              Let's get your store set up and running
            </p>
          </div>

          {/* Quick Start */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>✅ What's Already Working</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Product Browsing</p>
                  <p className="text-sm text-muted-foreground">
                    Browse 20+ products from FakeStore API with search & filters
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Shopping Cart & Wishlist</p>
                  <p className="text-sm text-muted-foreground">
                    Add items to cart and save favorites (works without login)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Stock Management</p>
                  <p className="text-sm text-muted-foreground">
                    Out of stock items are automatically disabled
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium">Responsive Design</p>
                  <p className="text-sm text-muted-foreground">
                    Works beautifully on mobile, tablet, and desktop
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Firebase Setup */}
          <FirebaseSetup />

          {/* Features Requiring Login */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>🔐 Features After Google Sign-In Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-primary mt-0.5" />
                <div>
                  <p className="font-medium">Complete Checkout</p>
                  <p className="text-sm text-muted-foreground">
                    Save addresses and place orders
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-primary mt-0.5" />
                <div>
                  <p className="font-medium">Order History</p>
                  <p className="text-sm text-muted-foreground">
                    Track all your orders with status updates
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-5 w-5 rounded-full border-2 border-primary mt-0.5" />
                <div>
                  <p className="font-medium">Admin Dashboard</p>
                  <p className="text-sm text-muted-foreground">
                    Manage order status (On Process, Shipped, Delivered)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button asChild size="lg">
              <Link to="/">Start Shopping →</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;
