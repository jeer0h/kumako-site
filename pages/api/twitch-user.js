export default async function handler(req, res) {
  const { login } = req.query;
  console.log("📦 Twitch API lookup for:", login);

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

  const headers = {
    Authorization: `Bearer ${access_token}`,
    "Client-Id": process.env.TWITCH_CLIENT_ID,
  };

  // Step 1: Get user info
  const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${login}`, { headers });
  const userData = await userRes.json();
  const user = userData.data?.[0];
  if (!user) return res.status(404).json({ error: "User not found" });

  const userId = user.id;
  console.log("📦 User ID:", userId);

  // Step 2: Check if live
  const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, { headers });
  const streamData = await streamRes.json();
  const stream = streamData.data?.[0];
  const isLive = Boolean(stream);

  // Step 3: Get recent VOD
  const vodRes = await fetch(`https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=1`, { headers });
  const vodData = await vodRes.json();
  const vod = vodData.data?.[0];
  if (vod) console.log("📺 Latest VOD:", vod);

  // Step 4: Determine gameId
  const gameId = stream?.game_id || vod?.game_id;
  console.log("🎮 gameId to fetch:", gameId);

  let gameName = null;
  let boxArt = null;

  if (gameId) {
    const gameRes = await fetch(`https://api.twitch.tv/helix/games?id=${gameId}`, { headers });
    const gameData = await gameRes.json();
    console.log("🎮 game data response:", gameData);
    gameName = gameData?.data?.[0]?.name || null;

    const game = gameData.data?.[0];
    boxArt = game?.box_art_url?.replace('{width}', '285').replace('{height}', '380');
  }
 
  res.status(200).json({
    name: user.display_name,
    avatar: user.profile_image_url,
    description: user.description,
    viewCount: user.view_count,
    followers: null, // deprecated
    isLive,
    title: stream?.title || vod?.title || null,
    game: gameName,
    viewers: stream?.viewer_count || null,
    thumbnail: stream?.thumbnail_url?.replace("{width}", "640").replace("{height}", "360") ||
               vod?.thumbnail_url?.replace("%{width}", "640").replace("%{height}", "360") || null,
    lastStreamDate: vod?.created_at || null,
    boxArt,
  });
}
