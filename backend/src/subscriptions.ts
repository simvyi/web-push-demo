import type { PushSubscription } from "web-push";
export type SubscriptionEntry = {
  userId: string;
  userAgent: string;
  subscription: PushSubscription;
};

const database = new Map<string, SubscriptionEntry[]>();

export class SubscriptionManager {
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

  removeSubscription(dto: { userId: string; userAgent: string }) {
    const entries = database.get(dto.userId);
    if (!entries) return;

    database.set(
      dto.userId,
      entries.filter((e) => e.userAgent !== dto.userAgent)
    );
  }

  getSubscriptions(userId: string) {
    return database.get(userId) ?? [];
  }
}
