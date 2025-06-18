import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mockData';

const TestimonialsCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who've transformed their fitness journey with us
          </p>
        </div>

        <div className="relative">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-xl p-8 md:p-12">
              {/* Quote Icon */}
              <div className="absolute top-6 left-6 text-primary-200">
                <Quote className="h-12 w-12" />
              </div>

              {/* Testimonial Content */}
              <div className="text-center pt-8">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-xl md:text-2xl text-secondary-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-secondary-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-secondary-600">
                      {testimonials[currentTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-secondary-600 hover:text-primary-600"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-secondary-600 hover:text-primary-600"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial ? 'bg-primary-600' : 'bg-secondary-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Background Decorations */}
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-200 rounded-full opacity-50 animate-bounce-subtle"></div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent-200 rounded-full opacity-50 animate-bounce-subtle" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-secondary-600 mb-4">Ready to join our community?</p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
            Start Your Journey
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;