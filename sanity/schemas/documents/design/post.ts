import { DocumentIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'designPost',
    title: 'Bài viết thiết kế',
    type: 'document',
    icon: DocumentIcon,
    fields: [
        defineField({
            name: 'title',
            title: 'Tiêu đề bài viết',
            type: 'string',
            validation: (Rule) => Rule.required().error('Vui lòng nhập tiêu đề'),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required().error('Vui lòng nhập slug'),
        }),
        defineField({
            name: 'category',
            title: 'Hạng mục thiết kế',
            type: 'reference',
            to: [{ type: 'designCategory' }],
            validation: (Rule) => Rule.required().error('Vui lòng chọn hạng mục'),
        }),
        defineField({
            name: 'excerpt',
            title: 'Tóm tắt',
            type: 'text',
            rows: 3,
            description: 'Hiển thị ngắn gọn trên danh sách bài viết',
        }),
        defineField({
            name: 'thumbnail',
            title: 'Ảnh đại diện',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'content',
            title: 'Nội dung',
            type: 'array',
            of: [{ type: 'block' }, { type: 'image' }],
            validation: (Rule) => Rule.required().error('Vui lòng nhập nội dung'),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Ngày đăng',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'category.title',
            media: 'thumbnail',
        },
    },
});
