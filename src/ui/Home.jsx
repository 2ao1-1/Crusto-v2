import { Link } from 'react-router-dom';
import Button from './Button';

function Home() {
  return (
    <div>
      {/* Hero Section with Video Background */}
      <section className="relative h-[calc(100vh-80px)] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/main1.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Welcome to Crusto Pizza
          </h1>
          <p className="mb-8 max-w-2xl text-sm text-white/90 md:text-base">
            Discover the finest authentic Italian pizza crafted with premium
            ingredients and traditional recipes passed down through generations.
          </p>
          <Button to="/menu" type="primary" className="mb-4 md:mb-0">
            Order Now
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-main md:text-4xl">
            Why Choose Crusto Pizza?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="mb-4 text-4xl">🍕</div>
              <h3 className="mb-2 text-xl font-semibold text-main">
                Fresh Daily
              </h3>
              <p className="text-sm text-stone-600">
                We use fresh ingredients daily to ensure the best taste in every
                bite
              </p>
            </div>
            <div className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="mb-4 text-4xl">⚡</div>
              <h3 className="mb-2 text-xl font-semibold text-main">
                Fast Delivery
              </h3>
              <p className="text-sm text-stone-600">
                Your pizza arrives hot and fresh within 30 minutes
              </p>
            </div>
            <div className="group rounded-xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="mb-4 text-4xl">⭐</div>
              <h3 className="mb-2 text-xl font-semibold text-main">
                Premium Quality
              </h3>
              <p className="text-sm text-stone-600">
                We maintain the highest quality standards in pizza preparation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-main py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Ready to Taste the Best Pizza?
          </h2>

          <Button to="/menu" type="second" className="mb-4 md:mb-0">
            View Menu
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-800 py-8 text-stone-400">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 text-center text-sm sm:grid-cols-2 md:grid-cols-3">
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Opening Hours
              </h4>
              <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
              <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Contact Us
              </h4>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@crustopizza.com</p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-semibold text-white">
                Follow Us
              </h4>
              <div className="flex justify-center space-x-4">
                <Link to="/" className="text-white hover:text-second">
                  Facebook
                </Link>
                <Link to="/" className="text-white hover:text-second">
                  Instagram
                </Link>
                <Link to="/" className="text-white hover:text-second">
                  Twitter
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} Crusto Pizza. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
