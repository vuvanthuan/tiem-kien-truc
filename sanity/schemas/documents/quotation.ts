import { DocumentSheetIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "quotation",
    title: "Báo giá",
    icon: DocumentSheetIcon,
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Tiêu đề",
            type: "string",
            description: "Tiêu đề chính của phần báo giá.",
            validation: (rule) =>
                rule.required().max(100).error("Vui lòng nhập tiêu đề (tối đa 100 ký tự)."),
        }),
        defineField({
            name: "slug",
            title: "Đường dẫn (Slug)",
            type: "slug",
            description: "Slug là bắt buộc để phần báo giá hiển thị trên website.",
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
            description: "Tóm tắt ngắn gọn hoặc mô tả sơ lược cho phần báo giá.",
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
                                        to: [{ type: "post" }, { type: "introduction" }, { type: "quotation" }],
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
        defineField({
            name: "requests",
            title: "Yêu cầu báo giá",
            type: "array",
            description: "Danh sách các yêu cầu báo giá từ khách hàng gửi qua form.",
            of: [
                {
                    type: "object",
                    name: "request",
                    title: "Yêu cầu báo giá",
                    fields: [
                        defineField({
                            name: "customerName",
                            title: "Tên khách hàng",
                            type: "string",
                            validation: (rule) => rule.required().error("Vui lòng nhập tên khách hàng."),
                        }),
                        defineField({
                            name: "contactInfo",
                            title: "Thông tin liên hệ",
                            type: "string",
                            description: "Email hoặc số điện thoại của khách hàng.",
                            validation: (rule) => rule.required().error("Vui lòng nhập thông tin liên hệ."),
                        }),
                        defineField({
                            name: "serviceType",
                            title: "Loại dịch vụ",
                            type: "string",
                            options: {
                                list: [
                                    { title: "Thiết kế nội thất", value: "interior_design" },
                                    { title: "Thiết kế kiến trúc", value: "architecture_design" },
                                    { title: "Thi công", value: "construction" },
                                    { title: "Khác", value: "other" },
                                ],
                                layout: "dropdown",
                            },
                            validation: (rule) => rule.required().error("Vui lòng chọn loại dịch vụ."),
                        }),
                        defineField({
                            name: "budget",
                            title: "Ngân sách dự kiến",
                            type: "number",
                            description: "Ngân sách dự kiến (VND).",
                            validation: (rule) =>
                                rule.min(0).error("Ngân sách không được âm.").warning("Nên nhập ngân sách cụ thể."),
                        }),
                        defineField({
                            name: "details",
                            title: "Chi tiết yêu cầu",
                            type: "text",
                            description: "Mô tả chi tiết về yêu cầu báo giá của khách hàng.",
                            rows: 4,
                        }),
                        defineField({
                            name: "submittedAt",
                            title: "Thời gian gửi",
                            type: "datetime",
                            description: "Thời gian khách hàng gửi yêu cầu.",
                            readOnly: true,
                            initialValue: () => new Date().toISOString(),
                        }),
                    ],
                    preview: {
                        select: {
                            customerName: "customerName",
                            serviceType: "serviceType",
                            submittedAt: "submittedAt",
                        },
                        prepare({ customerName, serviceType, submittedAt }) {
                            return {
                                title: customerName || "Khách hàng chưa đặt tên",
                                subtitle: `${serviceType || "Chưa chọn dịch vụ"} | ${new Date(
                                    submittedAt
                                ).toLocaleDateString("vi-VN")}`,
                            };
                        },
                    },
                },
            ],
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
