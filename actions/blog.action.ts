"use server";

import { prisma } from "@/app/utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function handleSubmission(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }

  const title = formData.get("title");
  const content = formData.get("content");
  const url = formData.get("url");

  await prisma.blogPost.create({
    data: {
      title: title as string,
      content: content as string,
      imageUrl: url as string,
      authorId: user.id,
      authorName: user.given_name as string,
      authorImage: user.picture as string,
    },
  });

  return redirect("/dashboard");
}

export async function getBlogs() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/register");
  }

  const data = await prisma.blogPost.findMany({
    where: {
      authorId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export async function getData() {
  const data = await prisma.blogPost.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      authorName: true,
      authorImage: true,
      createdAt: true,
      authorId: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}
