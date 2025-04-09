import { InfoOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "introduction",
    title: "Giới thiệu",
    icon: InfoOutlineIcon,
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Tiêu đề",
            type: "string",
            description: "Tiêu đề chính của phần giới thiệu.",
            validation: (rule) =>
                rule.required().max(100).error("Vui lòng nhập tiêu đề (tối đa 100 ký tự)."),
        }),
        defineField({
            name: "slug",
            title: "Đường dẫn (Slug)",
            type: "slug",
            description: "Slug là bắt buộc để phần giới thiệu hiển thị trên website.",
            options: {
                source: "title",
                maxLength: 96,
                isUnique: (value, context) => context.defaultIsUnique(value, context),
            },
            validation: (rule) => rule.required().error("Vui lòng nhập slug."),
        }),
        defineField({
            name: "description",
            title: "Mô tả ngắn",
            type: "text",
            description: "Tóm tắt ngắn gọn hoặc mô tả sơ lược cho phần giới thiệu.",
            rows: 3,
            validation: (rule) =>
                rule.max(200).warning("Nên giới hạn mô tả trong 200 ký tự để ngắn gọn."),
        }),
        defineField({
            name: "content",
            title: "Nội dung",
            type: "array",
            description: "Nội dung chính với đầy đủ định dạng văn bản.",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Bình thường", value: "normal" },
                        { title: "Tiêu đề 1", value: "h1" },
                        { title: "Tiêu đề 2", value: "h2" },
                        { title: "Tiêu đề 3", value: "h3" },
                        { title: "Tiêu đề 4", value: "h4" },
                        { title: "Tiêu đề 5", value: "h5" },
                        { title: "Tiêu đề 6", value: "h6" },
                        { title: "Trích dẫn", value: "blockquote" },
                        { title: "Mã code", value: "code" },
                    ],
                    lists: [
                        { title: "Chấm tròn", value: "bullet" },
                        { title: "Số thứ tự", value: "number" },
                        { title: "Vuông", value: "square" },
                    ],
                    marks: {
                        decorators: [
                            { title: "In đậm", value: "strong" },
                            { title: "Nghiêng", value: "em" },
                            { title: "Gạch chân", value: "underline" },
                            { title: "Gạch ngang", value: "strike" },
                            { title: "Mã code", value: "code" },
                            { title: "Trên dòng", value: "sup" },
                            { title: "Dưới dòng", value: "sub" },
                        ],
                        annotations: [
                            {
                                name: "link",
                                type: "object",
                                title: "Liên kết ngoài",
                                fields: [
                                    {
                                        name: "href",
                                        type: "url",
                                        title: "URL",
                                        validation: (rule) =>
                                            rule.uri({ scheme: ["http", "https", "mailto"] }).required(),
                                    },
                                    {
                                        name: "openInNewTab",
                                        type: "boolean",
                                        title: "Mở trong tab mới",
                                        initialValue: true,
                                    },
                                ],
                            },
                            {
                                name: "internalLink",
                                type: "object",
                                title: "Liên kết nội bộ",
                                fields: [
                                    {
                                        name: "reference",
                                        type: "reference",
                                        title: "Tài liệu tham chiếu",
                                        to: [{ type: "post" }, { type: "introduction" }],
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: "image",
                    options: { hotspot: true },
                    fields: [
                        {
                            name: "alt",
                            type: "string",
                            title: "Văn bản thay thế",
                            description: "Quan trọng cho SEO và khả năng truy cập.",
                        },
                        {
                            name: "caption",
                            type: "string",
                            title: "Chú thích",
                            description: "Chú thích tùy chọn cho ảnh.",
                        },
                    ],
                },
                {
                    type: "file",
                    title: "Tập tin đính kèm",
                    fields: [
                        {
                            name: "description",
                            type: "string",
                            title: "Mô tả tập tin",
                            description: "Mô tả tùy chọn cho tập tin.",
                        },
                    ],
                },
            ],
            validation: (rule) => rule.required().error("Vui lòng nhập nội dung."),
        }),
    ],
    preview: {
        select: {
            title: "title",
            description: "description",
            slug: "slug.current",
        },
        prepare({ title, description, slug }) {
            return {
                title: title || "Chưa có tiêu đề",
                subtitle: `${description || "Chưa có mô tả"} | Slug: ${slug || "Chưa có slug"}`,
            };
        },
    },
});
