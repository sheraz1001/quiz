import { ArrowRight, BookOpen, Users, Globe, Award, Star, CheckCircle, Clock, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GCC Health Portal</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#authorities" className="text-gray-600 hover:text-blue-600 transition-colors">Authorities</Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">Login</Link>
            <Link href="/register">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              🎉 New: Quiz Analytics & Performance Tracking
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Master Your <span className="text-blue-600">GCC Health Exams</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Comprehensive quiz platform for healthcare professionals preparing for licensing 
            examinations across Gulf Cooperation Council countries. Practice with real exam-style questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/register">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center">
                Start Free Trial <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
            <Link href="#demo">
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all">
                View Demo Quiz
              </button>
            </Link>
          </div>
          <div className="flex justify-center items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              No Credit Card Required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              1000+ Questions
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
              Instant Results
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div id="features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">8+ Health Authorities</h3>
            <p className="text-gray-600 text-center text-sm">
              Coverage for DHA, MOHAP, DOH, SCFHS, QCHP, OMSB, NHRA, and KMLE
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">25+ Specialties</h3>
            <p className="text-gray-600 text-center text-sm">
              From General Practice to specialized fields like Surgery, Nursing, and Pharmacy
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">1000+ Questions</h3>
            <p className="text-gray-600 text-center text-sm">
              High-quality questions with detailed explanations and references
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-center">Performance Analytics</h3>
            <p className="text-gray-600 text-center text-sm">
              Track your progress with detailed analytics and personalized insights
            </p>
          </div>
        </div>

        {/* Demo Quiz Section */}
        <div id="demo" className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Try a Sample Question</h2>
            <p className="text-gray-600">Experience our interactive quiz format</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Question 1 of 1</span>
                <span className="text-sm font-medium text-blue-600">DHA - General Practice</span>
              </div>
              <h3 className="text-lg font-semibold mb-4">
                A 45-year-old patient presents with chest pain radiating to the left arm and jaw. 
                The ECG shows ST-elevation in leads V1-V4. What is the most likely diagnosis?
              </h3>
              <div className="space-y-3">
                {[
                  "Unstable angina",
                  "Anterior STEMI",
                  "Posterior STEMI", 
                  "Pericarditis"
                ].map((option, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Submit Answer
              </button>
            </div>
          </div>
        </div>

        {/* Health Authorities Section */}
        <div id="authorities" className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Supported Health Authorities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'DHA', country: 'Dubai, UAE', color: 'bg-blue-50 border-blue-200' },
              { name: 'MOHAP', country: 'UAE Federal', color: 'bg-green-50 border-green-200' },
              { name: 'DOH', country: 'Abu Dhabi, UAE', color: 'bg-purple-50 border-purple-200' },
              { name: 'SCFHS', country: 'Saudi Arabia', color: 'bg-red-50 border-red-200' },
              { name: 'QCHP', country: 'Qatar', color: 'bg-yellow-50 border-yellow-200' },
              { name: 'OMSB', country: 'Oman', color: 'bg-indigo-50 border-indigo-200' },
              { name: 'NHRA', country: 'Bahrain', color: 'bg-pink-50 border-pink-200' },
              { name: 'KMLE', country: 'Kuwait', color: 'bg-orange-50 border-orange-200' },
            ].map((authority) => (
              <div key={authority.name} className={`p-4 rounded-xl border-2 ${authority.color} hover:scale-105 transition-transform`}>
                <div className="font-semibold text-lg text-gray-800">{authority.name}</div>
                <div className="text-sm text-gray-600">{authority.country}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Plan</h2>
            <p className="text-gray-600">Flexible pricing options to suit your needs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "149",
                currency: "AED",
                period: "month",
                features: ["1 Health Authority", "1 Specialty", "50 Questions/day", "Basic Analytics"],
                color: "border-gray-200"
              },
              {
                name: "Professional",
                price: "299",
                currency: "AED", 
                period: "month",
                features: ["3 Health Authorities", "Multiple Specialties", "Unlimited Questions", "Advanced Analytics", "Detailed Explanations"],
                color: "border-blue-500 ring-2 ring-blue-200",
                popular: true
              },
              {
                name: "Premium",
                price: "499",
                currency: "AED",
                period: "month", 
                features: ["All Authorities", "All Specialties", "Unlimited Access", "Performance Tracking", "Priority Support"],
                color: "border-gray-200"
              }
            ].map((plan) => (
              <div key={plan.name} className={`bg-white rounded-xl p-6 border-2 ${plan.color} relative`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.currency}/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Healthcare Professionals Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Ahmed Al-Mansouri",
                role: "General Practitioner",
                authority: "DHA Licensed",
                comment: "The questions are exactly like the real exam. I passed my DHA exam on the first try!",
                rating: 5
              },
              {
                name: "Nurse Fatima Al-Zahra", 
                role: "Registered Nurse",
                authority: "MOHAP Licensed",
                comment: "Excellent platform with detailed explanations. The analytics helped me focus on weak areas.",
                rating: 5
              },
              {
                name: "Dr. Sarah Johnson",
                role: "Internal Medicine",
                authority: "SCFHS Licensed", 
                comment: "Comprehensive question bank covering all topics. Highly recommend for exam preparation.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-sm text-blue-600">{testimonial.authority}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel in Your Exams?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Join thousands of healthcare professionals who have successfully passed their licensing exams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 font-semibold">
                Start Your Journey Today <ArrowRight className="ml-2 w-5 h-5 inline" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">GCC Health Portal</span>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering healthcare professionals across the GCC region with comprehensive exam preparation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#features" className="hover:text-blue-600">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-blue-600">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-blue-600">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/help" className="hover:text-blue-600">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
                <li><Link href="/status" className="hover:text-blue-600">System Status</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-600">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-600">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 GCC Health Exams Quiz Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}