import { createFileRoute } from '@tanstack/react-router';
import { SignIn } from '../../views/SignIn/SignIn.tsx';
import { redirectIfLoggedIn } from '../../auth/redirectIfLoggedIn.ts';

export const Route = createFileRoute('/sign-in/')({
  component: SignIn,
  beforeLoad: () => redirectIfLoggedIn(),
});
