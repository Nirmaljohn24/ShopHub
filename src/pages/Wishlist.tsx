import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useShop } from '@/contexts/ShopContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-md mx-auto text-center p-8">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save your favorite items for later!
            </p>
            <Button asChild>
              <Link to="/">Browse Products</Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <Link to={`/product/${item.id}`}>
                <div className="aspect-square bg-secondary p-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <h3 className="font-semibold line-clamp-2 mb-2">{item.title}</h3>
                <p className="text-2xl font-bold text-primary mb-4">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => addToCart(item)}
                    disabled={item.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
