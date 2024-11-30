/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export async function createIdea(state: any, form: FormData, pitch: string) {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "not signed in",
      status: "ERROR",
    });
  }
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key === "pitch")
  );
  const slug = slugify(title as string, { lower: true, strict: true });
  try {
    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        Current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };
    const result = await writeClient.create({ _type: "startup", ...startup });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (e) {
    console.log(e);
    return parseServerActionResponse({
      error: JSON.stringify(e),
      status: "ERROR",
    });
  }
}