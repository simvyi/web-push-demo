export const clientUrl = "https://localhost:3000";
export const vapidDetails = {
  subject: "mailto:simvyi@gmail.com", // The subject may either be a url or an email prefixed with mailto:
  privateKey: process.env.VAPID_PRIVATE_KEY ?? "",
  publicKey: process.env.VAPID_PUBLIC_KEY ?? "",
} as const;

export const fcmDetails = {
  fcmServiceAccountFileName: process.env.FCM_SA_FILE_NAME ?? "",
};
