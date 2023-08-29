export const clientUrl = "https://localhost:3000";
export const vapidDetails = {
  subject: "mailto:simvyi@gmail.com",
  privateKey: process.env.VAPID_PRIVATE_KEY ?? "",
  publicKey: process.env.VAPID_PUBLIC_KEY ?? "",
};
