import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { SignUpButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, BarChart2, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Link2,
    title: 'Shorten Any URL',
    description:
      'Turn long, unwieldy links into clean, shareable short URLs in one click.',
  },
  {
    icon: BarChart2,
    title: 'Track Every Click',
    description:
      'See real-time analytics on how many times your links are clicked and when.',
  },
  {
    icon: Zap,
    title: 'Instant Redirects',
    description:
      'Lightning-fast redirects powered by edge infrastructure — no delays for your audience.',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description:
      'All links are tied to your account and managed safely with authentication built in.',
  },
];

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect('/dashboard');

  return (
    <main className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-1 gap-8 px-6 py-24 text-center">
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-zinc-50">
          Short links.{' '}
          <span className="text-primary">Big impact.</span>
        </h1>
        <p className="max-w-xl text-lg text-zinc-400 leading-relaxed">
          LinkShortner turns any long URL into a clean, trackable short link. Share
          smarter, measure what matters, and manage all your links from one place.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
            <Button size="lg">Get started for free</Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold text-zinc-50 mb-10">
            Everything you need to manage your links
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title} className="bg-zinc-900 border-zinc-800">
                <CardHeader className="pb-2">
                  <Icon className="h-7 w-7 text-primary mb-2" />
                  <CardTitle className="text-base text-zinc-50">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
