import { createFileRoute } from '@tanstack/react-router';
import { authGuard } from '../../../auth/authGuard';
import { StatsView } from '../../../views/Stats/Stats.tsx';

export const Route = createFileRoute('/user/my_stats/')({
  component: StatsView,
  beforeLoad: async () => authGuard(),
});
