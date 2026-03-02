import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { useDocumentHead } from "../hooks/useDocumentHead";
import { getBlogPost } from "../lib/blog";

export default function BlogPost() {
  const { t } = useTranslation();
  const { lang, slug } = useParams<{ lang: string; slug: string }>();

  const post = getBlogPost(lang || "zh-tw", slug || "");

  useDocumentHead(
    post ? post.frontmatter.title : t("blog.meta.title"),
    post ? post.frontmatter.description : t("blog.meta.description")
  );

  if (!post) {
    return <Navigate to={`/${lang}/blog`} replace />;
  }

  return (
    <div>
      <article className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            to={`/${lang}/blog`}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            &larr; {t("blog.backToList")}
          </Link>

          <header className="mt-6 mb-10">
            <time className="text-sm text-gray-400">{post.frontmatter.date}</time>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              {post.frontmatter.title}
            </h1>
          </header>

          <div className="prose prose-gray max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </div>
  );
}
