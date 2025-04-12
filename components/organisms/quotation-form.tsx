"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/molecules/form";

const quotationSchema = z.object({
  customerName: z
    .string()
    .min(1, "Vui lòng nhập tên khách hàng")
    .max(100, "Tên không được vượt quá 100 ký tự"),
  contactInfo: z
    .string()
    .min(1, "Vui lòng nhập thông tin liên hệ")
    .max(100, "Thông tin liên hệ không được vượt quá 100 ký tự")
    .regex(
      /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|^\d{10,11}$)/,
      "Vui lòng nhập email hoặc số điện thoại hợp lệ"
    ),
  serviceType: z
    .string()
    .min(1, "Vui lòng chọn loại dịch vụ")
    .refine(
      (value) =>
        ["interior_design", "architecture_design", "construction", "other"].includes(value),
      "Loại dịch vụ không hợp lệ"
    ),
  budget: z
    .string()
    .optional()
    .refine((value) => !value || !isNaN(Number(value)) && Number(value) >= 0, {
      message: "Ngân sách phải là số không âm",
    }),
  details: z.string().max(1000, "Chi tiết không được vượt quá 1000 ký tự").optional(),
});

type QuotationFormData = z.infer<typeof quotationSchema>;

export default function QuotationForm() {
    const pathname = usePathname()
    const slug = pathname.split("/").pop() || "bao-gia-thiet-ke";
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuotationFormData>({
    resolver: zodResolver(quotationSchema),
    defaultValues: {
      customerName: "",
      contactInfo: "",
      serviceType: "",
      budget: "",
      details: "",
    },
  });

  const handleSubmit = async (data: QuotationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/submit-quotation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, slug }),
      });
      const result = await response.json();
      if (result.success) {
        setMessage("Yêu cầu báo giá đã được gửi thành công!");
        form.reset();
      } else {
        setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên khách hàng</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nhập tên của bạn"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contactInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thông tin liên hệ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Email hoặc số điện thoại"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại dịch vụ</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dịch vụ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="interior_design">Thiết kế nội thất</SelectItem>
                  <SelectItem value="architecture_design">Thiết kế kiến trúc</SelectItem>
                  <SelectItem value="construction">Thi công</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngân sách dự kiến (VND)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="Nhập ngân sách (tùy chọn)"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chi tiết yêu cầu</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  rows={5}
                  placeholder="Mô tả yêu cầu của bạn"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
        {message && (
          <p
            className={
              message.includes("thành công") ? "text-green-600" : "text-red-600"
            }
          >
            {message}
          </p>
        )}
      </form>
    </Form>
  );
}
