import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { getBlogPosts } from "../lib/blog";

export default function Blog() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  useDocumentHead(t("blog.meta.title"), t("blog.meta.description"));

  const posts = getBlogPosts(lang || "zh-tw");

  return (
    <div>
      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {t("blog.hero.title")}
        </h1>
        <p className="text-lg text-gray-500">
          {t("blog.hero.subtitle")}
        </p>
      </section>

      {/* Post list */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400">{t("blog.empty")}</p>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/${lang}/blog/${post.slug}`}
                  className="block p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <time className="text-sm text-gray-400">{post.frontmatter.date}</time>
                  <h2 className="text-xl font-semibold text-gray-900 mt-1 mb-2">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {post.frontmatter.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
