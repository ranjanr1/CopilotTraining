# Authentication

## Rules

- **Clerk is the only authentication provider.** Do not implement custom auth, NextAuth, Auth.js, Supabase auth, or any other auth mechanism.
- Never build login forms, session management, or JWT handling manually. Delegate all of it to Clerk.

---

## Protected Routes

`/dashboard` is a protected route. Access requires the user to be signed in.

Enforce this in `proxy.ts` at the `linkshortnerproject/` root (`middleware.ts` is deprecated — use `proxy.ts`):

```ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect({
      unauthenticatedUrl: new URL('/', request.url).toString(),
    });
  }
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
};
```

---

## Homepage Redirect

If a signed-in user visits `/`, redirect them to `/dashboard`.

```tsx
// app/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect('/dashboard');

  // render signed-out homepage...
}
```

---

## Sign In / Sign Up — Modal Only

Sign-in and sign-up must always open as a **Clerk modal**. Do not route users to a separate `/sign-in` or `/sign-up` page.

```tsx
import { SignInButton, SignUpButton } from '@clerk/nextjs';

// mode="modal" is required
<SignInButton mode="modal">
  <button>Sign in</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign up</button>
</SignUpButton>
```

- Do not create `app/sign-in/` or `app/sign-up/` route folders.
- Do not set `NEXT_PUBLIC_CLERK_SIGN_IN_URL` or `NEXT_PUBLIC_CLERK_SIGN_UP_URL` environment variables — these enable full-page routes, which are not used here.

---

## UI — Auth State

Use Clerk's `<Show>` component to render different UI for signed-in vs. signed-out users:

```tsx
import { Show, UserButton } from '@clerk/nextjs';

<Show when="signed-out">
  <SignInButton mode="modal"><button>Sign in</button></SignInButton>
  <SignUpButton mode="modal"><button>Sign up</button></SignUpButton>
</Show>

<Show when="signed-in">
  <UserButton />
</Show>
```

---

## Getting the Current User

```ts
// Server Components / Server Actions / route.ts
import { auth, currentUser } from '@clerk/nextjs/server';

const { userId } = await auth();      // lightweight — use for DB queries
const user = await currentUser();     // full user object — use only when needed
```

- Always check `userId` before performing any user-scoped database operation.
- Use `userId` as the foreign key in database records — it is a stable, unique string.
