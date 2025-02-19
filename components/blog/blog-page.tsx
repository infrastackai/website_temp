"use client";

import { useScreenSize } from "@/hooks/use-screen-size";
import { blog } from "@/lib/source";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { DocsBody, DocsPage } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

type BlogPageProps = {
  slug: string[];
};
export default function BlogPage({ slug }: BlogPageProps) {
  const { isMobile, isTablet } = useScreenSize();
  const page = blog.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  return (
    <DocsPage
      tableOfContent={{
        style: "clerk",
      }}
      lastUpdate={new Date(Date.now())}
      toc={!isMobile && !isTablet ? page.data.toc : undefined}
      full={page.data.full}
      breadcrumb={{ enabled: false }}
      container={{
        className: "flex flex-col justify-center items-center py-12",
      }}
    >
      {(isMobile || isTablet) && <InlineTOC items={page.data.toc} />}
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents }} />
      </DocsBody>
    </DocsPage>
  );
}
