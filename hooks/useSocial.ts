
import { api } from "@/lib/api"; // Adjust your path to your axios/fetch instance

export const connectCircleSocial = async (
  circleId: string,
  platform: 'tiktok' | 'youtube' | 'instagram' | 'x',
  callbackUrl: string
) => {
  try {
    const { data } = await api.post(
      `/circles/${circleId}/social-accounts/${platform}/connect`,
      {}, // Empty body
      {
        params: { callback_url: callbackUrl }
      }
    );
    return data; // Returns { authorization_url, state }
  } catch (error) {
    console.error("Failed to initiate social connection", error);
    throw error;
  }
};