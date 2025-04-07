import { TocItem } from "@/sanity/lib/utils";

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
  if (!toc.length) return null;

  return (
    <nav className="toc mb-8 rounded-lg bg-gray-100 p-4">
      <h2 className="mb-2 text-xl font-bold">Mục lục</h2>
      <ul className="list-inside list-decimal">
        {toc.map((item) => (
          <li
            key={item.id}
            className={`mb-1 ${item.level === 1 ? "" : "ml-4"}`}
          >
            <a
              href={`#${item.id}`}
              className="text-blue-600 hover:underline"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
