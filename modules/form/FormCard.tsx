"use client";
import { updateForm } from "@/actions/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Flex } from "@/components/ui/Flex";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Show } from "@/components/ui/Show";
import { Textarea } from "@/components/ui/textarea";
import { FormSchema, FormSchemaType } from "@/schemas/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form as IForm } from "@prisma/client";
import { formatDistance } from "date-fns";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";

export const FormCard = ({ form }: { form: IForm }) => {
  const { push } = useRouter();
  //   console.log("🚀 ~ FormCard ~ form:", form);
  //   const form = useForm({
  //     resolver: zodResolver(FormSchema),
  //     values: form,
  //   });

  //   const {
  //     value: showForm,
  //     setTrue: openForm,
  //     setFalse: closeForm,
  //   } = useBoolean();

  //   const onSubmit = async (values: FormSchemaType) => {
  //     try {
  //       const form = await updateForm(values);
  //     } catch (error) {}
  //     console.log("🚀 ~ onSubmit ~ values:", values);
  //   };
  return (
    <Card
      className="w-full h-[150px] cursor-pointer"
      onClick={() => push(`/form/${form.id}`)}
    >
      <CardHeader>
        <CardTitle>
          <Flex justify={"between"} align={"center"}>
            <span>{form?.name}</span>
            <Show
              when={form?.isPublished}
              fallback={<Badge variant={"secondary"}>Draft</Badge>}
            >
              <Badge>Public</Badge>
            </Show>
          </Flex>
        </CardTitle>
        <CardDescription>
          {formatDistance(form?.createdAt, new Date(), {
            addSuffix: true,
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CardDescription>{form?.description}</CardDescription>
      </CardContent>
    </Card>
  );
};
