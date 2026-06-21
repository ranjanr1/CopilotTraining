import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { links } from '@/db/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/');

  const userLinks = await db
    .select()
    .from(links)
    .where(eq(links.userId, userId));

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Links</h1>
      {userLinks.length === 0 ? (
        <p className="text-muted-foreground">No links yet.</p>
      ) : (
        <ul className="space-y-4">
          {userLinks.map((link) => (
            <li key={link.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    /{link.slug}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline break-all"
                  >
                    {link.url}
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    Created {link.createdAt.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

