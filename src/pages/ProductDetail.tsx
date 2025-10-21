import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useShop } from '@/contexts/ShopContext';
import { ShoppingCart, Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart, addToWishlist, wishlist } = useShop();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct({
        ...data,
        stock: Math.floor(Math.random() * 20),
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const isOutOfStock = product.stock === 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-secondary p-8">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </Card>
            {isOutOfStock && (
              <Badge className="absolute top-4 right-4 bg-destructive text-lg px-4 py-2">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-semibold">{product.rating.rate}</span>
                  <span className="text-muted-foreground ml-1">
                    ({product.rating.count} reviews)
                  </span>
                </div>
              </div>
              <p className="text-4xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Stock Status */}
            <div>
              {isOutOfStock ? (
                <Badge variant="destructive" className="text-base px-4 py-2">
                  Out of Stock
                </Badge>
              ) : product.stock && product.stock < 5 ? (
                <Badge className="bg-accent text-base px-4 py-2">
                  Only {product.stock} left in stock
                </Badge>
              ) : (
                <Badge className="bg-success text-base px-4 py-2">
                  In Stock
                </Badge>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addToCart(product)}
                disabled={isOutOfStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant={isInWishlist ? 'default' : 'outline'}
                onClick={() => addToWishlist(product)}
                disabled={isOutOfStock}
              >
                <Heart
                  className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
