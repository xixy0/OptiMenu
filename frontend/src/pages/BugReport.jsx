import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const severityLevels = [
  { value: "1", label: "1 - Low (Minor visual issue)" },
  {
    value: "2",
    label: "2 - Slight (Functionality affected but has workaround)",
  },
  { value: "3", label: "3 - Moderate (Feature partially broken)" },
  { value: "4", label: "4 - High (Feature completely broken)" },
  { value: "5", label: "5 - Critical (Application crash or data loss)" },
];

const formSchema = z.object({
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  severity: z.string().min(1, {
    message: "Please select a severity level.",
  }),
});

const BugReport = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      url: "",
      description: "",
      severity: "",
    },
  });

  function onSubmit(values) {
    console.log(values);
    toast.success("Bug report submitted", {
      description: "Thank you for your feedback!",
    });
    form.reset();
  }

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl">Report a Bug</CardTitle>
          <CardDescription>
            Help us improve by reporting any issues you encounter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Brief description of the issue"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Summarize the bug in a few words.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/page-with-error"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The page where you encountered the issue.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Error Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please describe what happened in detail..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include any error messages and steps to reproduce the
                      issue.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="severity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Severity Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select severity level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {severityLevels.map((level) => (
                          <SelectItem
                            key={level.value}
                            value={level.value}
                          >
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How severely does this bug impact your experience?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
              >
                Submit Bug Report
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BugReport;
