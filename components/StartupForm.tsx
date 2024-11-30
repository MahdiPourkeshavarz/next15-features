/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
import { createIdea } from "@/lib/actions";

function StartupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("**hello world**");
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });
  const { toast } = useToast();
  const router = useRouter();

  async function handleFormSubmit(prevState: any, formData: FormData) {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category"),
        link: formData.get("link"),
        pitch,
      };
      await formSchema.parseAsync(formValues);
      const res = await createIdea(prevState, formData, pitch);
      if (res.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "you have successfully submitted your idea!",
          variant: "default",
        });
        router.push(`/startup/${res._id}`);
      }
      return res;
    } catch (e) {
      if (e instanceof z.ZodError) {
        const fieldErrors = e.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast({
          title: "Error",
          description: "please check your inputs and try again",
          variant: "destructive",
        });
        return { ...prevState, error: "validation failed", status: "ERROR" };
      }
      toast({
        title: "Error",
        description: "an unexpected error has occurred",
        variant: "destructive",
      });
      return {
        ...prevState,
        error: "an unexpected error has occurred",
        status: "ERROR",
      };
    }
  }

  return (
    <>
      <form className="startup-form" action={formAction}>
        <div>
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <Input
            id="title"
            name="title"
            className="startup-form_input"
            required
            placeholder="Startup Title"
          />
          {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="category" className="startup-form_label">
            Category
          </label>
          <Input
            id="category"
            name="category"
            className="startup-form_input"
            required
            placeholder="Tech, Health, ..."
          />
          {errors.category && (
            <p className="startup-form_error">{errors.category}</p>
          )}
        </div>
        <div>
          <label htmlFor="link" className="startup-form_label">
            Image Link
          </label>
          <Input
            id="link"
            name="link"
            className="startup-form_input"
            required
            placeholder="https://..."
          />
          {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>
        <div>
          <label htmlFor="title" className="startup-form_label">
            Title
          </label>
          <Textarea
            id="description"
            name="description"
            className="startup-form_textarea"
            required
            placeholder="Startup Description"
          />
          {errors.description && (
            <p className="startup-form_error">{errors.description}</p>
          )}
        </div>
        <div data-color-mode="light">
          <label htmlFor="pitch" className="startup-form_label">
            Pitch
          </label>
          <MDEditor
            id="pitch"
            value={pitch}
            onChange={(val) => setPitch(val as string)}
            preview="edit"
            height={300}
            style={{ borderRadius: 24, overflow: "hidden" }}
            textareaProps={{
              placeholder:
                "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>
        <Button
          type="submit"
          className="startup-form_btn text-white"
          disabled={isPending}
        >
          {!isPending ? "Post" : "Submitting..."}
          <Send className="size-6 ml-2" />
        </Button>
      </form>
    </>
  );
}

export default StartupForm;
