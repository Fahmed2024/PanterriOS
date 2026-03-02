import { UsersDetialsPage } from '@/components/dashboard/users/page';

export default async function UsersIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return <UsersDetialsPage id={id} />;
}
