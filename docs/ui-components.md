# UI Components

## Rules

- **shadcn/ui is the only component library.** Do not create custom components from scratch.
- Every UI element — buttons, inputs, cards, dialogs, dropdowns, tables, etc. — must use a shadcn/ui component.
- If a shadcn component doesn't exist in `components/ui/` yet, scaffold it with the CLI before using it.

---

## Adding Components

Run from inside `linkshortnerproject/`:

```bash
npx shadcn add <component>
# Examples:
npx shadcn add button
npx shadcn add card
npx shadcn add input
npx shadcn add dialog
npx shadcn add dropdown-menu
```

This writes the component to `components/ui/<component>.tsx`. Do not add it manually.

---

## Using Components

Always import from `@/components/ui/`:

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
```

---

## Composing UI

Build layouts by **composing shadcn primitives** — do not wrap them in unnecessary custom wrapper components:

```tsx
// ✅ Good — compose shadcn components directly
<Card>
  <CardHeader>
    <CardTitle>My Links</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="outline">Copy</Button>
  </CardContent>
</Card>

// ❌ Bad — custom component reimplementing what shadcn already provides
function MyCard({ title, children }) {
  return <div className="rounded border p-4">...</div>;
}
```

---

## Customisation

- Edit shadcn components in `components/ui/` directly — they are your code.
- Use the `className` prop with `cn()` to extend styles without forking the component:

```tsx
import { cn } from '@/lib/utils';

<Button className={cn('w-full', isLoading && 'opacity-50')}>Submit</Button>
```

- Never re-scaffold a component that already exists in `components/ui/`.
