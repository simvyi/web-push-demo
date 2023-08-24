import type { PushSubscription } from "web-push";
export type SubscriptionEntry = {
  userId: string;
  userAgent: string;
  subscription: PushSubscription;
};

const database = new Map<string, SubscriptionEntry[]>();

export class SubscriptionManagementService {
  saveSubscription(
    userId: string,
    userAgent: string,
    subscription: PushSubscription
  ) {
    const entry: SubscriptionEntry = {
      userId,
      userAgent,
      subscription,
    };
    const subscriptions = database.get(userId);
    if (!subscriptions) {
      database.set(userId, [entry]);
      return;
    }

    database.set(userId, [
      ...subscriptions?.filter((s) => s.userAgent !== userAgent),
      entry,
    ]);
  }
  getSubscriptions(userId: string) {
    return database.get(userId) ?? [];
  }
}
