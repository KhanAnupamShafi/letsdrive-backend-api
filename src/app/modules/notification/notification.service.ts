import { Notification } from '@prisma/client';
import prisma from '../../shared/prisma';

const createData = async (data: Notification): Promise<Notification> => {
  const { userId } = data;
  const maxNotificationKeepCount = 9;
  const result = await prisma.$transaction(async tx => {
    const existingUserNotifications = await tx.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    const notificationsToBeDeleted = existingUserNotifications.slice(maxNotificationKeepCount);

    if (notificationsToBeDeleted.length > 0) {
      await tx.notification.deleteMany({
        where: { id: { in: notificationsToBeDeleted.map(notification => notification.id) } },
      });
    }

    const newNotification = await tx.notification.create({
      data,
      include: { user: true, booking: true },
    });

    return newNotification;
  });

  return result;
};

// const existingUserNotifications = await tx.notification.findMany({
//     where: { userId },
//     orderBy: { timestamp: 'desc' },
//   });
//   console.log(existingUserNotifications, 'existingUserNotifications');

//   const notificationsToBeDeleted = existingUserNotifications.slice(maxNotificationCount - 1);
//   console.log(notificationsToBeDeleted, 'ayaya');

//   if (notificationsToBeDeleted.length > 0) {
//     await tx.notification.deleteMany({
//       where: { id: { in: notificationsToBeDeleted.map(notification => notification.id) } },
//     });
//   }
//   const newNotification = await tx.notification.create({
//     data,
//     include: { user: true, booking: true },
//   });

//   return newNotification;

const updateNotificationStat = async (userId: string): Promise<Notification[]> => {
  const result = prisma.$transaction(async tx => {
    const existingUserNotifications = await tx.notification.findMany({
      where: { userId, isRead: false },
    });

    if (existingUserNotifications.length === 0) {
      return [];
    }

    await tx.notification.updateMany({
      where: { userId, isRead: false },

      data: { isRead: true },
    });

    const updatedNotifications = await tx.notification.findMany({
      where: { userId, isRead: true },

      include: { user: true, booking: true },
    });

    return updatedNotifications;
  });
  // const result = await prisma.notification.update({
  //   where: { id },
  //   data: { isRead: true },
  //   include: { booking: true, user: true },
  // });
  return result;
};

export const notificationService = { createData, updateNotificationStat };
