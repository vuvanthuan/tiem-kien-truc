import { TocItem } from "@/sanity/lib/utils";

export default function TableOfContents({ toc }: { toc: TocItem[] }) {
    if (!toc.length) return null;

    return (
        <nav className="p-4 mb-8 bg-gray-100 rounded-lg toc">
            <h2 className="mb-2 text-xl font-bold">Mục lục</h2>
            <ul className="list-decimal list-inside">
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
