import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Globe } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { culturalFacts } from '../data/culturalTrivia';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(isSignup ? 'Signing up:' : 'Logging in:', { email, password });
    setIsLoading(false);
    onLoginSuccess();
  };

  // Rotate cultural facts every 5 seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % culturalFacts.length);
    }, 5000);
    return () => clearInterval(interval);
  });

  const currentFact = culturalFacts[currentFactIndex];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-warm via-background to-surface-cool"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-brand rounded-full opacity-10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-48 h-48 bg-gradient-brand-secondary rounded-full opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Cultural patterns decoration */}
      <div className="absolute top-10 right-10 text-6xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}>🌍</div>
      <div className="absolute bottom-20 left-20 text-4xl opacity-5 animate-pulse" style={{ animationDelay: '3s' }}>🏛️</div>
      <div className="absolute top-1/2 right-20 text-5xl opacity-5 animate-pulse" style={{ animationDelay: '4s' }}>🎭</div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Hero */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <BrandLogo size="xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {isSignup ? 'Begin Your Cultural Journey' : 'Welcome Back, Explorer'}
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            {isSignup 
              ? 'Join millions of travelers exploring and learning about diverse cultures worldwide' 
              : 'Continue your adventure through the world\'s most fascinating cultures and destinations'
            }
          </p>
        </div>

        {/* Cultural Fact Carousel */}
        <div className="glass-effect rounded-2xl p-4 mb-6 border border-white/20">
          <div className="flex items-start">
            <div className="bg-gradient-brand-secondary p-2 rounded-full mr-3 flex-shrink-0">
              <Globe size={16} className="text-white" />
            </div>
            <div>
              <div className="flex items-center mb-1">
                <span className="text-xs font-semibold text-brand-secondary uppercase tracking-wide">
                  Cultural Insight
                </span>
                <span className="ml-2 text-xs bg-brand-secondary/10 text-brand-secondary px-2 py-0.5 rounded-full">
                  {currentFact.culture}
                </span>
              </div>
              <p className="text-sm text-gray-700 italic leading-relaxed">
                "{currentFact.fact}"
              </p>
              <div className="text-xs text-gray-500 mt-1">📍 {currentFact.region}</div>
            </div>
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center mt-3 space-x-1">
            {culturalFacts.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  index === currentFactIndex ? 'bg-brand-secondary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-effect rounded-3xl p-8 shadow-xl border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-brand text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-brand hover:scale-[1.02] transition-all duration-200 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isSignup ? 'Start Exploring' : 'Continue Journey'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignup ? 'Already exploring with us?' : 'New cultural adventurer?'}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="ml-2 font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
              >
                {isSignup ? 'Sign In' : 'Join Wandr'}
              </button>
            </p>
          </div>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200">
                <img src="https://www.apple.com/favicon.ico" alt="Apple" className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200">
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By continuing, you agree to explore cultures respectfully and follow our{' '}
            <a href="#" className="text-brand-primary hover:underline">Cultural Guidelines</a>
            {' '}and{' '}
            <a href="#" className="text-brand-primary hover:underline">Privacy Policy</a>
          </p>
        </div>

        {/* Cultural Mission Statement */}
        <div className="text-center mt-6 p-4 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/20">
          <p className="text-sm text-gray-700 italic">
            "Travel to learn, explore to understand, connect to celebrate the beautiful diversity of our world."
          </p>
        </div>
      </div>
    </div>
  );
}