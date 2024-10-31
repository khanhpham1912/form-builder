"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
// import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSchemaType, FormSchema } from "@/schemas/form";
import { toast } from "@/hooks/use-toast";
import { createForm } from "@/actions/form";
import { useForm } from "react-hook-form";
import { useBoolean } from "usehooks-ts";

export const CreateForm = () => {
  const {
    value: showForm,
    setTrue: openForm,
    setFalse: closeForm,
  } = useBoolean();
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const form = await createForm(values);
      if (form) {
        toast({
          title: "Success",
          description: "Create form successfully",
        });
        closeForm();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog
      open={showForm}
      onOpenChange={(open) => {
        if (!open) {
          closeForm();
          form.reset();
          return;
        }
        openForm();
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Create form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New form</DialogTitle>
          <DialogDescription>Create a new form</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter name"
                      {...field}
                      // value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Enter description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
