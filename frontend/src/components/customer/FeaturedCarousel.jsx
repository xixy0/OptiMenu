import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, TrendingUp, ShoppingCart, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import useCart from "@/stores/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const FeaturedCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const cart = useCart((state) => state.items);
  const addToCart = useCart((state) => state.addToCart);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || "",
    });
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <Card className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-xl overflow-hidden mb-4 shadow-lg">
      <Badge 
        variant="default" 
        className="absolute top-2 left-2 z-10 bg-gradient-to-r from-blue-600 to-blue-500 px-2 py-0.5 text-[10px]"
      >
        Most Popular
      </Badge>

      <div 
        className="relative h-[200px] sm:h-[240px] md:h-[280px]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "absolute inset-0 transition-all duration-500 transform",
              index === currentIndex ? "opacity-100 translate-x-0" : "opacity-0",
              index < currentIndex && "-translate-x-full",
              index > currentIndex && "translate-x-full"
            )}
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* Mobile Image (Small Circle) */}
              <div className="md:hidden absolute right-3 top-3 w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg z-20">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="w-full md:w-7/12 p-3 pt-12 md:p-6 flex flex-col justify-center relative z-10">
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 tracking-tight line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-1">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-[10px]">
                      {item.category}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 text-amber-600 border-amber-200 bg-amber-50 text-[10px]">
                      <TrendingUp className="w-2.5 h-2.5" />
                      {item.demandScore}% Popular
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 text-xs md:text-sm line-clamp-2 md:line-clamp-3">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-lg md:text-xl font-bold text-blue-600">
                      {formatCurrency(item.price)}
                    </span>
                    <Button
                      size="sm"
                      className={cn(
                        "h-8 px-3 text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
                        "transition-all duration-300 ease-out",
                        "hover:shadow-blue-500/25",
                        !item.available && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop Image Section */}
              <div className="hidden md:block md:w-5/12 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent z-10" />
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/90 hover:bg-white shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-3 h-3 text-gray-800" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-full bg-white/90 hover:bg-white shadow-sm hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Next slide"
      >
        <ChevronRight className="w-3 h-3 text-gray-800" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-1 h-1 rounded-full transition-all duration-300",
              "transform hover:scale-125 focus:outline-none",
              index === currentIndex
                ? "bg-blue-600 w-2"
                : "bg-gray-300 hover:bg-gray-400"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  );
};

export default FeaturedCarousel;