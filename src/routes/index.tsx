import { createFileRoute } from '@tanstack/react-router';

export const HomePageLayout = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>test</p>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: HomePageLayout,
});
