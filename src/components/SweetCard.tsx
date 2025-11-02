import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, RefreshCw, Loader2 } from "lucide-react"; // Import icons for delete and restock
import { motion } from "framer-motion";

interface SweetCardProps {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  onPurchase: (id: string) => void;
  onDelete: (id: string) => void;
  onRestock: (id: string, quantity: number) => void;
  isProcessing?: boolean;
}

// Indian sweets image URL mapping - High quality images
const getIndianSweetImage = (name: string, category: string): string => {
  const sweetName = name.toLowerCase();
  
  // Map sweet names to high-quality Indian sweet images (600x600 for better quality)
  const imageMap: { [key: string]: string } = {
    // Halwa variations
    'gajar': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=600&fit=crop&q=90',

    // Laddu variations
    'laddu': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&h=600&fit=crop&q=90',

    
    // Barfi variations
    'barfi': 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=600&h=600&fit=crop&q=90',
    'kaju': 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=600&h=600&fit=crop&q=90',
    'badam': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=600&fit=crop&q=90',
    
    // Gulab Jamun
    'gulab': 'https://images.unsplash.com/photo-1571990821790-7fc0a4b6b700?w=600&h=600&fit=crop&q=90',
    
    // Jalebi
    'jalebi': 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=600&h=600&fit=crop&q=90',
    
    // Rasgulla
    'rasgulla': 'https://images.unsplash.com/photo-1631459035699-509af1d3e99e?w=600&h=600&fit=crop&q=90',
    
    // Other sweets
    'mysore': 'https://images.unsplash.com/photo-1570993492881-25240ce854f4?w=600&h=600&fit=crop&q=90',
    'soan': 'https://images.unsplash.com/photo-1550774413-63b4e94e70da?w=600&h=600&fit=crop&q=90',
    'rasmalai': 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=600&h=600&fit=crop&q=90',
    'kheer': 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=600&h=600&fit=crop&q=90',
  };

  // Check if sweet name contains any of the mapped keywords
  for (const [keyword, url] of Object.entries(imageMap)) {
    if (sweetName.includes(keyword)) {
      return url;
    }
  }

  // Category-based fallback with better quality
  const categoryFallback: { [key: string]: string } = {
    'halwa': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=600&fit=crop&q=90',
    'candy': 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&h=600&fit=crop&q=90',
    'milk sweet': 'https://images.unsplash.com/photo-1571990821790-7fc0a4b6b700?w=600&h=600&fit=crop&q=90',
    'syrup sweet': 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=600&h=600&fit=crop&q=90',
    'bengali sweet': 'https://images.unsplash.com/photo-1631459035699-509af1d3e99e?w=600&h=600&fit=crop&q=90'
  };

  return categoryFallback[category] || 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=600&fit=crop&q=90';
};

export const SweetCard = ({
  id,
  name,
  category,
  description,
  price,
  quantity,
  imageUrl,
  onPurchase,
  onDelete,
  onRestock,
  isProcessing = false,
}: SweetCardProps) => {
  const isOutOfStock = quantity === 0;

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden glass hover:shadow-candy transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
          <img
            src={imageUrl && imageUrl !== '' ? imageUrl : getIndianSweetImage(name, category)}
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          <div className="absolute top-2 right-2">
            <Badge
              variant={isOutOfStock ? "destructive" : "secondary"}
              className="capitalize"
            >
              {category}
            </Badge>
          </div>

          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4 flex-1">
          <h3 className="font-semibold text-lg mb-1">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {description}
            </p>
          )}
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-primary">
              ₹{price.toFixed(2)}
            </span>
            <span className="text-sm text-muted-foreground">
              Stock: {quantity}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Button
            className="flex-1 btn-candy"
            onClick={() => onPurchase(id)}
            disabled={isOutOfStock || isProcessing}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isProcessing ? "Processing..." : "Buy Now"}
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={() => {
              if (window.confirm(`Are you sure you want to delete ${name}?`)) {
                onDelete(id);
              }
            }}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const newQuantity = window.prompt(`Enter restock quantity for ${name}:`);
              if (newQuantity && !isNaN(Number(newQuantity)) && Number(newQuantity) > 0) {
                onRestock(id, Number(newQuantity));
              }
            }}
            disabled={isProcessing}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};