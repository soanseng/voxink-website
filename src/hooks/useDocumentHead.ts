import { useEffect } from "react";

export function useDocumentHead(title: string, description: string) {
  useEffect(() => {
    document.title = title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    }
  }, [title, description]);
}
