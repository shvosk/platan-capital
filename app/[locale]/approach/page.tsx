import { client } from '@/sanity/client';
import { pageBySlugQuery, teamMembersQuery } from '@/sanity/lib/queries';
import { pick } from '@/sanity/lib/locale';
import type { Locale } from '@/i18n';

export const revalidate = 60;

export default async function ApproachPage({ params: { locale } }: { params: { locale: Locale } }) {
  const [page, team] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: 'approach' }),
    client.fetch(teamMembersQuery),
  ]);

  return (
    <section className="mx-auto max-w-content px-6 py-20 lg:px-10">
      <h1 className="mb-10 font-display text-display font-medium text-ink">
        {pick(page?.title, locale) ?? 'Approach'}
      </h1>

      <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {team?.map((member: any) => (
          <li key={member._id}>
            <p className="font-display text-xl text-ink">{member.name}</p>
            <p className="label mt-1 text-muted">{pick(member.role, locale)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
