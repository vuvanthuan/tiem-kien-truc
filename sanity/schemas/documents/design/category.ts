import { FolderIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'designCategory',
  title: 'Hạng mục thiết kế',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Tiêu đề hạng mục',
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
      name: 'description',
      title: 'Mô tả ngắn',
      type: 'text',
      rows: 3,
      description: 'Tóm tắt ngắn gọn về hạng mục',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
    },
  },
});
