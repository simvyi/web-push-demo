import webpush from "web-push";
import type { PushSubscription } from "web-push";

export type PushMessage = {
  title: string;
  body: string;
  url: string;
};

export class PushClient {
  constructor() {}
  /**
   * Sends out a push notification to all given subscriptions
   * @param subscriptions push subscriptions to notify
   * @param notification notification to be shown
   *
   * @returns endpoints that had a failed requests
   */
  async sendPush(subscriptions: PushSubscription[], notification: PushMessage) {
    const results = await Promise.allSettled(
      subscriptions.map((s) =>
        webpush.sendNotification(s, JSON.stringify(notification))
      )
    );

    return results
      .map((r) =>
        r.status === "rejected"
          ? { enpoint: r.reason.endpoint, error: r.reason.message }
          : undefined
      )
      .filter((x) => x !== undefined);
  }
}
