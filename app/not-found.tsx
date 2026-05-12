import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center space-y-6 sm:space-y-8 max-w-md">
          <div className="flex justify-center">
            <FileQuestion className="h-20 w-20 sm:h-24 sm:w-24 text-muted-foreground" />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold">404</h1>
            <h2 className="text-xl sm:text-2xl font-semibold">Page Not Found</h2>
            <p className="text-muted-foreground text-sm sm:text-base px-4">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">Go Home</Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
