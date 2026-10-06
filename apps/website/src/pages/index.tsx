import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

export default function Home(): ReactNode {
  const logoUrl = useBaseUrl('/img/logo.svg');

  return (
    <Layout>
      <main className="container margin-vert--xl text--center">
        <img src={logoUrl} alt="Tessera logo" width={112} height={112} />
        <h1 className="margin-top--sm">Tessera</h1>
        <p className="text--lg">
          Copyable React Native components for Expo — shadcn-style. Copy the
          code, don&apos;t install a package.
        </p>
        <div className="margin-top--md">
          <Link
            className="button button--primary button--lg margin--sm"
            to="/docs/intro">
            Get started
          </Link>
          <Link
            className="button button--secondary button--lg margin--sm"
            to="/docs/components/typography">
            Browse components
          </Link>
        </div>
      </main>
    </Layout>
  );
}
