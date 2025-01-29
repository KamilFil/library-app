import { createFileRoute } from '@tanstack/react-router';
import { SignIn } from '../../views/SignIn/SignIn.tsx';

export const Route = createFileRoute('/sign-in/')({
  component: SignIn,
  loader: async () => {},
});
