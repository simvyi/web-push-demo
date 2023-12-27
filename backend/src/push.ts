import { applicationDefault, initializeApp } from "firebase-admin/app";
import { type MulticastMessage, getMessaging } from "firebase-admin/messaging";
import webpush from "web-push";
import type { PushSubscription } from "web-push";
import type { FCMTokenEntry } from "./fcmTokens";

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

/* ----------------- FCM Logic --------------- */
export class FCMPushClient {
  private app = initializeApp({
    credential: applicationDefault(),
  });

  constructor() {}

  public get messaging() {
    return getMessaging(this.app);
  }

  // how to send push notifications, https://firebase.google.com/docs/cloud-messaging/send-message
  async sendPush(tokens: string[], notification: PushMessage) {
    if (tokens.length === 0) return [];

    const message = {
      data: notification,
      tokens: tokens,
    } satisfies MulticastMessage;

    const result = await this.messaging.sendEachForMulticast(message);
    return result.responses
      .filter((r) => !r.success)
      .map((r) => ({
        error: r.error!.message,
        code: r.error?.code ?? "",
        messageId: r.messageId ?? "",
      }));
  }
}
