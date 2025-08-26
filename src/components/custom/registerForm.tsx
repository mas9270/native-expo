"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { reactToastify } from "@/utils/toastify";
import { useState } from "react";
import CustomModal from "./customModal";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "نام کاربری باید حداقل ۳ کاراکتر باشد" })
    .max(20, { message: "نام کاربری نمی‌تواند بیشتر از ۲۰ کاراکتر باشد" }),
  email: z.string().email({ message: "ایمیل معتبر وارد کنید" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

export default function RegisterForm(props: {
  onDone?: (value: boolean) => void;
}) {
  const { onDone } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [open1, setOpen1] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.succces) {
          reactToastify({
            type: "warning",
            message: res?.message,
          });
        } else {
          reactToastify({
            type: "success",
            message: res?.message,
          });
          if (onDone) {
            onDone(true);
          }
          setOpen1(false);
        }
        setLoading(false);
      })
      .catch((error) => {
        reactToastify({
          type: "warning",
          message: error?.message
            ? error?.message
            : "خطایی رخ داده است دوباره تلاش کنید یا به مدیر سیستم اطلاع دهید",
        });
        setLoading(false);
      });
  }

  return (
    <div className="">
      <Button
        className="cursor-pointer bg-sky-400 hover:bg-sky-300"
        title="ثبت نام"
        onClick={() => {
          form.reset();
          setOpen1(true);
        }}
      >
        <div className="hidden md:block">ثبت نام</div>
        <UserPlus />
      </Button>
      <CustomModal
        loading={loading}
        width="500px"
        title="فرم ثبت نام"
        open={open1}
        onClose={() => {
          form.reset();
          setOpen1(false);
        }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام کاربری</FormLabel>
                  <FormControl>
                    <Input placeholder="مثلاً ali123" {...field} />
                  </FormControl>
                  <FormDescription>
                    این نام برای نمایش عمومی شما استفاده خواهد شد.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ایمیل</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              {loading ? <Loader2 className="animate-spin" /> : "ثبت"}
            </Button>
          </form>
        </Form>
      </CustomModal>
    </div>
  );
}
