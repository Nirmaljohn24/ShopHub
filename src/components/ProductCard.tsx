import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useShop } from '@/contexts/ShopContext';
import { Link } from 'react-router-dom';

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

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToWishlist, wishlist } = useShop();
  const isInWishlist = wishlist.some((item) => item.id === product.id);
  const isOutOfStock = product.stock === 0;

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-medium">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          {isOutOfStock && (
            <Badge className="absolute top-2 right-2 bg-destructive">
              Out of Stock
            </Badge>
          )}
          {!isOutOfStock && product.stock && product.stock < 5 && (
            <Badge className="absolute top-2 right-2 bg-accent">
              Only {product.stock} left
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Badge variant="secondary" className="mb-2">
          {product.category}
        </Badge>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold line-clamp-2 mb-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">★</span>
            <span className="text-sm ml-1">{product.rating.rate}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.rating.count} reviews)
          </span>
        </div>
        <p className="text-2xl font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 gap-2">
        <Button
          className="flex-1"
          onClick={() => addToCart(product)}
          disabled={isOutOfStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
        <Button
          variant={isInWishlist ? "default" : "outline"}
          size="icon"
          onClick={() => addToWishlist(product)}
          disabled={isOutOfStock}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
