"use server";

import prisma from "@/lib/prisma";
import { FormSchema, FormSchemaType } from "@/schemas/form";
import { currentUser } from "@clerk/nextjs/server";
import { Form } from "@prisma/client";

class UserNotFoundError extends Error {}

export async function getFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: { visits: true, submissions: true },
  });
  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;
  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }
  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate,
  };
}

export async function createForm(data: FormSchemaType) {
  const validation = FormSchema.safeParse(data);
  if (validation.error) {
    throw new Error("Form not valid");
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  const { name, description } = data;
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });
  return form;
}

export async function updateForm(data: Form) {
  const validation = FormSchema.safeParse(data);
  if (validation.error) {
    throw new Error("Form not valid");
  }
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  const { name, description } = data;
  const form = await prisma.form.update({
    where: {
      id: data.id,
      userId: user.id,
    },
    data: {
      name,
      description,
    },
  });
  return form;
}

export async function getForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }
  return await prisma.form.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: "desc",
    },
  });
}
