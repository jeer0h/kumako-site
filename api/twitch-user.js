export default async function handler(req, res) {
  const { login } = req.query;

  try {
    const tokenRes = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });

    const { access_token } = await tokenRes.json();

    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${login}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
      },
    });

    const data = await userRes.json();
    const user = data.data?.[0];

    if (!user) return res.status(404).json({ error: "User not found" });

    const followersRes = await fetch(`https://api.twitch.tv/helix/users/follows?to_id=${user.id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID,
      },
    });

    const followersData = await followersRes.json();

    res.status(200).json({
      name: user.display_name,
      avatar: user.profile_image_url,
      description: user.description,
      viewCount: user.view_count,
      followers: followersData.total,
    });
  } catch (err) {
    console.error("Twitch API error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
