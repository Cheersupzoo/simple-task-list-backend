import { PrismaClient } from "@prisma/client";
import { UserInputError } from "apollo-server";
import { nanoid } from "nanoid";
import { UpdateTaskInput } from "../schema/inputs/List";
import List from "../schema/types/List";
import Task from "../schema/types/Task";

export class Database {
  private static prisma = new PrismaClient();
  public static async getLists(): Promise<List[]> {
    return (await Database.prisma.list.findMany({})).map((e) => List.defaultList({ id: e.id, title: e.title }));
  }

  public static async getList(id: string): Promise<List> {
    const list = await Database.prisma.list.findUnique({
      where: { id },
    });
    if (list === null) throw new UserInputError("List not exits");
    return List.defaultList({ id: list.id, title: list.title });
  }

  public static async addList({ title }: Partial<List>): Promise<List> {
    const response = await Database.prisma.list.create({
      data: {
        id: nanoid(10),
        title,
      },
    });
    return await Database.getList(response.id);
  }

  public static async updateList({ id, title }: Partial<List>): Promise<List> {
    await Database.isListIDExist(id);
    await Database.prisma.list.update({
      where: {
        id,
      },
      data: { title },
    });
    return await Database.getList(id);
  }

  public static async removeList({ id }: Partial<List>): Promise<List[]> {
    await Database.isListIDExist(id);
    await Database.prisma.task.deleteMany({
      where: {
        listId: id,
      },
    });
    await Database.prisma.list.delete({
      where: {
        id,
      },
    });
    return await Database.getLists();
  }

  public static async getTasksByListId(listId: string): Promise<Task[]> {
    return await Database.prisma.task.findMany({
      where: {
        listId: {
          equals: listId,
        },
      },
      orderBy: { order: "asc" },
    });
  }

  public static async addTask({ listId, title }: Partial<Task>): Promise<Task> {
    await Database.isListIDExist(listId);

    const length = await Database.prisma.task.count({
      where: {
        listId,
      },
    });

    const response = await Database.prisma.task.create({
      data: { id: nanoid(10), title, listId, order: length },
    });

    return await Database.prisma.task.findUnique({
      where: {
        id: response.id,
      },
    });
  }

  public static async updateTask({ listId, id, title, completed, order }: UpdateTaskInput): Promise<List> {
    await Database.isListIDExist(listId);
    await Database.isTaskIDExist(id);

    await Database.prisma.task.update({
      where: {
        id,
      },
      data: {
        title,
        completed,
      },
    });

    if (order !== undefined) {
      const length = await Database.prisma.task.count({
        where: {
          listId,
        },
      });

      if (order < 0 || order >= length) throw new UserInputError("Order out of range");

      const oldOrder = (
        await Database.prisma.task.findUnique({
          where: {
            id,
          },
          select: { order: true },
        })
      ).order;

      await Database.prisma.task.update({
        where: {
          id,
        },
        data: {
          order,
        },
      });

      await Database.prisma.task.updateMany({
        where: {
          listId: { equals: listId },
          id: { not: { equals: id } },
          AND: {
            order: { gte: order },
            AND: {
              order: { lt: oldOrder },
            },
          },
        },
        data: {
          order: {
            increment: 1,
          },
        },
      });

      await Database.prisma.task.updateMany({
        where: {
          listId: { equals: listId },
          id: { not: { equals: id } },
          AND: {
            order: { gt: oldOrder },
            AND: {
              order: { lte: order },
            },
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      });
    }

    return await Database.getList(listId);
  }

  public static async removeTask({ listId, id }: Partial<Task>): Promise<List> {
    await Database.isListIDExist(listId);
    await Database.isTaskIDExist(id);

    await Database.prisma.task.delete({ where: { id } });
    return await Database.getList(listId);
  }

  private static async isListIDExist(id: string) {
    const length = await Database.prisma.list.count({
      where: {
        id,
      },
    });
    if (length === 0) throw new UserInputError("List not exists");
  }

  private static async isTaskIDExist(id: string) {
    const length = await Database.prisma.task.count({
      where: {
        id,
      },
    });
    if (length === 0) throw new UserInputError("Task not exists");
  }
}
