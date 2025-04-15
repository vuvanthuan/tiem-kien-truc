"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/atoms/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/molecules/form"
import { Input } from "@/components/atoms/input"
import { Textarea } from "@/components/atoms/textarea"
import { useToast } from "@/components/molecules/toast/use-toast"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Tên phải có ít nhất 2 ký tự.",
    }),
    email: z.string().email({
        message: "Vui lòng nhập địa chỉ email hợp lệ.",
    }),
    phone: z.string().optional(),
    message: z.string().min(10, {
        message: "Tin nhắn phải có ít nhất 10 ký tự.",
    }),
})

type FormValues = z.infer<typeof formSchema>

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    })

    async function onSubmit(values: FormValues) {
        setIsSubmitting(true)

        try {
            // Here you would typically send the form data to your backend
            console.log(values)

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            toast({
                title: "Gửi thành công!",
                description: "Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.",
            })

            form.reset()
        } catch (error) {
            toast({
                title: "Đã xảy ra lỗi!",
                description: "Không thể gửi tin nhắn của bạn. Vui lòng thử lại sau.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-lg shadow-md bg-card"
        >
            <h2 className="mb-6 text-2xl font-bold">Gửi tin nhắn cho chúng tôi</h2>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ và tên</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập họ và tên của bạn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="example@email.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại (không bắt buộc)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập số điện thoại của bạn" {...field} />
                                </FormControl>
                                <FormDescription>Số điện thoại giúp chúng tôi liên hệ với bạn nhanh hơn</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tin nhắn</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Nhập nội dung tin nhắn của bạn" className="min-h-[120px]" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                            "Đang gửi..."
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" /> Gửi tin nhắn
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </motion.div>
    )
}
