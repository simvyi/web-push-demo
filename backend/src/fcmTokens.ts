import fs from "fs";

export type FCMTokenEntry = {
  userId: string;
  fcmToken: string;
  userAgent: string;
};

const db = new Map<string, FCMTokenEntry[]>();

export class TokenManager {
  /**
   * Stores or updates an entry of fcm token, user agent and userId.
   * Only one entry per user agent is stored for a given user.
   * @param entry fcm token and meta data needed to send push notification
   */
  saveToken(entry: FCMTokenEntry) {
    const tokens = db.get(entry.userId);
    if (!tokens) {
      db.set(entry.userId, [entry]);
      return;
    }

    db.set(entry.userId, [
      ...tokens.filter((s) => s.userAgent !== entry.userAgent),
      entry,
    ]);
  }

  /**
   * Deletes an fcm token entry for a given user and a given userAgent
   * @param dto object with details, userId and userAgent, needed to find a specific entry
   * @returns
   */
  removeToken(dto: { userId: string; userAgent: string }) {
    const entries = db.get(dto.userId);
    if (!entries) return;

    db.set(
      dto.userId,
      entries.filter((e) => e.userAgent !== dto.userAgent)
    );
  }

  /**
   * @param userId
   * @returns an array of entries for the given user
   */
  getTokens(userId: string) {
    return db.get(userId) ?? [];
  }
}
