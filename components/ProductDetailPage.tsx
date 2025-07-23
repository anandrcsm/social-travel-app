import { useState } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Truck, 
  Shield, 
  RotateCcw,
  CheckCircle,
  Package,
  CreditCard,
  Globe
} from 'lucide-react';
import { TravelProduct } from '../data/travelProducts';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductDetailPageProps {
  productId: string | null;
  allProducts: TravelProduct[];
  onBack: () => void;
}

export function ProductDetailPage({ productId, allProducts, onBack }: ProductDetailPageProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const product = allProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="p-4 text-center text-red-500 bg-surface-warm min-h-screen">
        <p>Product not found.</p>
      </div>
    );
  }

  const discountAmount = product.originalPrice ? product.originalPrice - product.price : 0;
  const discountPercentage = product.originalPrice 
    ? Math.round((discountAmount / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-surface-warm">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm z-10">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="flex items-center text-brand-primary hover:text-brand-primary-dark transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart 
                size={20} 
                className={isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'} 
              />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="pb-32">
        {/* Product Images */}
        <div className="bg-white">
          <div className="relative">
            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discountPercentage}%
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="absolute top-4 right-4 z-10">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </div>
            </div>

            {/* Main Image */}
            <div className="aspect-square bg-gray-50">
              <ImageWithFallback 
                src={product.images[selectedImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 p-4 bg-white overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === selectedImageIndex 
                        ? 'border-brand-primary' 
                        : 'border-gray-200'
                    }`}
                  >
                    <ImageWithFallback 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="bg-white mt-2 p-6">
          <div className="mb-4">
            <div className="text-sm text-brand-secondary font-medium mb-2">{product.brand}</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              )}
              {discountAmount > 0 && (
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                  Save ${discountAmount.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

            {/* Category Badge */}
            <div className="inline-block">
              <div className="bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full text-sm font-medium">
                {product.category}
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white mt-2 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Key Features</h3>
          <ul className="space-y-3">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={16} className="text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications */}
        <div className="bg-white mt-2 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Specifications</h3>
          <div className="space-y-3">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                <span className="text-gray-600 font-medium">{key}</span>
                <span className="text-gray-900">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="bg-white mt-2 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Travel Guarantees</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center p-3 bg-green-50 rounded-xl">
              <Truck size={20} className="text-green-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Free Worldwide Shipping</div>
                <div className="text-sm text-gray-600">On orders over $50</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-xl">
              <Shield size={20} className="text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">2-Year Warranty</div>
                <div className="text-sm text-gray-600">Manufacturing defects covered</div>
              </div>
            </div>
            <div className="flex items-center p-3 bg-orange-50 rounded-xl">
              <RotateCcw size={20} className="text-orange-600 mr-3" />
              <div>
                <div className="font-medium text-gray-900">30-Day Returns</div>
                <div className="text-sm text-gray-600">Free returns, no questions asked</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
        <div className="flex items-center space-x-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 font-medium">{selectedQuantity}</span>
            <button
              onClick={() => setSelectedQuantity(selectedQuantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            disabled={!product.inStock}
            className="flex-1 bg-gradient-brand text-white py-4 rounded-xl font-semibold hover:shadow-brand hover:scale-[1.02] transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart • ${(product.price * selectedQuantity).toFixed(2)}
          </button>
        </div>

        {/* Quick Buy Options */}
        <div className="flex space-x-2 mt-3">
          <button 
            className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center hover:bg-gray-800 transition-colors"
            onClick={() => window.open(product.affiliateLink, '_blank')}
          >
            <CreditCard size={16} className="mr-2" />
            Buy Now
          </button>
          <button 
            className="flex-1 bg-brand-secondary text-white py-3 rounded-xl font-semibold flex items-center justify-center hover:bg-brand-secondary-dark transition-colors"
            onClick={() => window.open(product.affiliateLink, '_blank')}
          >
            <Globe size={16} className="mr-2" />
            Official Store
          </button>
        </div>
      </div>
    </div>
  );
}