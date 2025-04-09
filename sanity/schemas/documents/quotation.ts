import { InfoOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "quotation",
    title: "Báo giá",
    icon: InfoOutlineIcon,
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Tiêu đề báo giá",
            type: "string",
            description: "Tiêu đề chính của báo giá.",
            validation: (rule) =>
                rule.required().max(100).error("Tiêu đề là bắt buộc và không vượt quá 100 ký tự."),
        }),
        defineField({
            name: "slug",
            title: "Đường dẫn (Slug)",
            type: "slug",
            description: "Slug là cần thiết để báo giá hiển thị trên website.",
            options: {
                source: "title",
                maxLength: 96,
                isUnique: (value, context) => context.defaultIsUnique(value, context),
            },
            validation: (rule) => rule.required().error("Slug là bắt buộc."),
        }),
        defineField({
            name: "description",
            title: "Mô tả ngắn",
            type: "text",
            description: "Tóm tắt ngắn gọn về báo giá.",
            rows: 3,
            validation: (rule) =>
                rule.max(200).warning("Mô tả không nên vượt quá 200 ký tự."),
        }),
        defineField({
            name: "content",
            title: "Nội dung chi tiết",
            type: "array",
            description: "Nội dung đầy đủ của báo giá, có thể định dạng văn bản phong phú.",
            of: [
                {
                    type: "block",
                    styles: [
                        { title: "Thông thường", value: "normal" },
                        { title: "Tiêu đề 1", value: "h1" },
                        { title: "Tiêu đề 2", value: "h2" },
                        { title: "Tiêu đề 3", value: "h3" },
                        { title: "Tiêu đề 4", value: "h4" },
                        { title: "Tiêu đề 5", value: "h5" },
                        { title: "Tiêu đề 6", value: "h6" },
                        { title: "Trích dẫn", value: "blockquote" },
                        { title: "Code", value: "code" },
                    ],
                    lists: [
                        { title: "Danh sách gạch đầu dòng", value: "bullet" },
                        { title: "Danh sách số thứ tự", value: "number" },
                        { title: "Danh sách vuông", value: "square" },
                    ],
                    marks: {
                        decorators: [
                            { title: "In đậm", value: "strong" },
                            { title: "In nghiêng", value: "em" },
                            { title: "Gạch chân", value: "underline" },
                            { title: "Gạch ngang", value: "strike" },
                            { title: "Code", value: "code" },
                            { title: "Chỉ số trên", value: "sup" },
                            { title: "Chỉ số dưới", value: "sub" },
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
                                        title: "Tham chiếu đến",
                                        to: [{ type: "post" }, { type: "quotation" }],
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
                            description: "Chú thích tùy chọn cho hình ảnh.",
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
                            description: "Mô tả tùy chọn cho tập tin đính kèm.",
                        },
                    ],
                },
            ],
            validation: (rule) => rule.required().error("Nội dung báo giá là bắt buộc."),
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
                title: title || "Báo giá chưa đặt tiêu đề",
                subtitle: `${description || "Chưa có mô tả"} | Slug: ${slug || "Không có slug"}`,
            };
        },
    },
});
