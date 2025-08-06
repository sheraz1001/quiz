import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BookOpen, Users, Globe, Award } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GCC Health Portal</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master Your <span className="text-blue-600">GCC Health Exams</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Comprehensive quiz platform for healthcare professionals preparing for licensing 
            examinations across Gulf Cooperation Council countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">8+ Health Authorities</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Coverage for DHA, MOHAP, DOH, SCFHS, QCHP, OMSB, NHRA, and KMLE
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">25+ Specialties</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                From General Practice to specialized fields like Surgery, Nursing, and Pharmacy
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">1000+ Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                High-quality questions with detailed explanations and references
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Track your progress with detailed analytics and personalized insights
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Health Authorities Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Supported Health Authorities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'DHA', country: 'Dubai, UAE' },
              { name: 'MOHAP', country: 'UAE Federal' },
              { name: 'DOH', country: 'Abu Dhabi, UAE' },
              { name: 'SCFHS', country: 'Saudi Arabia' },
              { name: 'QCHP', country: 'Qatar' },
              { name: 'OMSB', country: 'Oman' },
              { name: 'NHRA', country: 'Bahrain' },
              { name: 'KMLE', country: 'Kuwait' },
            ].map((authority) => (
              <Card key={authority.name} className="p-4">
                <CardContent className="text-center p-0">
                  <div className="font-semibold text-lg text-blue-600">{authority.name}</div>
                  <div className="text-sm text-gray-600">{authority.country}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel in Your Exams?</h2>
          <p className="text-xl mb-6 text-blue-100">
            Join thousands of healthcare professionals who have successfully passed their licensing exams.
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Start Your Journey Today <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 GCC Health Exams Quiz Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}