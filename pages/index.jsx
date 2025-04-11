import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { fetchSiteContent } from '../lib/contentful';
import { useEffect, useState } from "react";

export default function KumaKollectiveWebsite() {
  const members = [
    { name: "Jirō", twitch: "jeeroh_" },
    { name: "Berri", twitch: "terberri" },
    { name: "Sucrose", twitch: "sucrosecollision" },
    { name: "Nummi", twitch: "nummi_kuma" },
    { name: "Icey", twitch: "iceyboneshredderr" }
  ];

  const [memberData, setMemberData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutContent, setAboutContent] = useState(null);

  useEffect(() => {
    

    async function loadAbout() {
      const data = await fetchSiteContent("about-the-kollective");
      setAboutContent(data);
    }
    loadAbout();



    members.forEach(async (member) => {
      const res = await fetch(`/api/twitch-user?login=${member.twitch}`);
      const data = await res.json();
      // if (member.twitch === "jeeroh_") {
      //   data.isLive = true;
      //   data.viewers = 123;
      //   data.title = "Solo queueing in Marvel Rivals until I cry";
      //   data.game = "Marvel Rivals";
      //   data.boxArt = "https://static-cdn.jtvnw.net/ttv-boxart/518204-72x96.jpg"; // Marvel Rivals
      //   data.thumbnail = "https://static-cdn.jtvnw.net/previews-ttv/live_user_jeeroh_-640x360.jpg";
      // }
      
      // if (member.twitch === "terberri") {
      //   data.isLive = true;
      //   data.viewers = 42;
      //   data.title = "[Ultimate Ironmon] Let us leave the lab today!";
      //   data.game = "Pokémon FireRed/LeafGreen";
      //   data.boxArt = "https://static-cdn.jtvnw.net/ttv-boxart/611282-72x96.jpg"; // Pokémon FireRed/LeafGreen
      //   data.thumbnail = "https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/example-thumb.jpg";
      // }
      console.log(data);

      setMemberData((prev) => ({
        ...prev,
        [member.twitch]: {
          name: data.name,
          avatar: data.avatar,
          description: data.description,
          viewCount: data.viewCount,
          followers: data.followers,
          title: data.title,
          game: data.game,
          isLive: data.isLive,
          viewers: data.viewers,
          thumbnail: data.thumbnail,
          lastStreamDate: data.lastStreamDate,
          boxArt: data.boxArt,
        },
      }));
    });
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatRelativeDate = (isoString) => {
    if (!isoString) return "a while ago";
    const then = new Date(isoString);
    const now = new Date();
    const diffMs = now - then;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "today";
    if (diffDays === 1) return "yesterday";
    return `${diffDays} days ago`;
  };

  const randomRotation = () => {
    const classes = [
      'rotate-[-3deg]',
      'rotate-[-2deg]',
      'rotate-[-1deg]',
      'rotate-0',
      'rotate-[1deg]',
      'rotate-[2deg]',
      'rotate-[3deg]',
    ];
    return classes[Math.floor(Math.random() * classes.length)];
  };

  const onlineMembers = members.filter(member => memberData[member.twitch]?.isLive);
  const offlineMembers = members.filter(member => !memberData[member.twitch]?.isLive);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
      <div className="relative bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.png')" }}>
        <div className="absolute inset-0 bg-black/70 z-0" />
        <header className="flex justify-between items-start px-6 py-4 relative z-10">
          <a href="#home" className="relative z-20">
            <img
              src="/images/logo.webp"
              alt="Kuma Kollective Logo"
              className="h-24 sm:h-[160px] object-contain drop-shadow-xl transition-transform duration-300 hover:rotate-2 hover:scale-105"
            />
          </a>
          <div className="relative z-20 sm:flex sm:items-center">
            {/* Hamburger toggle for mobile */}
            <button
              className="sm:hidden p-2 text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>

            {/* Navigation links */}
            <nav className={`flex-col sm:flex-row sm:flex gap-4 mt-2 text-white ${isMenuOpen ? 'flex' : 'hidden'} sm:!flex`}>
              <a href="#home" className="hover:text-amber-400">Home</a>
              <a href="#members" className="hover:text-amber-400">Members</a>
              <a href="#streams" className="hover:text-amber-400">Streams</a>
              <a href="#events" className="hover:text-amber-400">Events</a>
              <a href="#about" className="hover:text-amber-400">About</a>
            </nav>
          </div>
        </header>

        <section id="home" className="text-center py-32 px-4 relative z-10 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg animate-slide-down">
            We’re totally not a cult.
          </h1>
          <p className="text-lg mb-6 text-white drop-shadow animate-fade-in delay-150">
            Meet the bears behind the magic.
          </p>
          <div className="space-x-4 animate-fade-in delay-300">
            <a href="#streams">
              <button className="bg-amber-400 text-black px-4 py-2 rounded-xl hover:bg-amber-300">
                Watch Live
              </button>
            </a>
            <button className="bg-transparent border border-white text-white px-4 py-2 rounded-xl hover:bg-white hover:text-black">
              Meet the Kollective
            </button>
          </div>
        </section>

        <div className="relative z-10">
          <svg
            className="block w-full h-[100px]"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z"
              fill="#1F1F1F"
            />
          </svg>
        </div>
      </div>

      <section id="members" className="py-4 px-6 bg-[#1F1F1F]">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center mb-8">
          {members.map((member, index) => (
            <div
              key={index}
              className={`relative transform hover:rotate-1 hover:scale-105 transition duration-300 w-40 ${randomRotation()}`}
            >
              <img
                src={`/images/${member.twitch}.png`}
                alt={`${member.name} Polaroid`}
                className="w-full object-contain"
              />
              {memberData[member.twitch]?.isLive && (
                <span
                  className="absolute top-2 right-2 flex items-center gap-1 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded-full animate-pulse"
                >
                  <span className="w-2 h-2 rounded-full bg-white" />
                  LIVE
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="streams" className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Who’s Live?</h2>

        {onlineMembers.length === 0 && (
          <p className="text-center text-sm text-gray-400 mb-4">
            None of the bears are live right now. Try again later!
          </p>
        )}

<ul className="max-w-3xl mx-auto space-y-4 mt-8">
  {[...onlineMembers, ...offlineMembers].map((member, index) => {
    const data = memberData[member.twitch];
    const isLive = data?.isLive;

    const card = (
      <li
        key={index}
        className={`rounded-xl p-4 shadow ${isLive ? 'bg-gray-700' : 'bg-gray-800'} flex flex-col gap-4`}
      >
        {/* First Row */}
        <div className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4`}>
          {/* Avatar + Info */}
          <div className="flex gap-4 items-center">
            {isLive ? (
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 hover:ring-2 hover:ring-amber-400 transition shrink-0">
                <img
                  src={data?.avatar}
                  alt={`${member.name}'s Twitch profile picture`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <a
                href={`https://twitch.tv/${member.twitch}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 hover:ring-2 hover:ring-amber-400 transition shrink-0">
                  <img
                    src={data?.avatar}
                    alt={`${member.name}'s Twitch profile picture`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            )}
            <div>
              <p className="text-lg font-semibold text-gray-100">{data?.name || member.name}</p>
              {isLive ? (
                <>
                  <p className="text-sm text-green-400 font-medium">Currently Live</p>
                  <p className="text-sm text-gray-300">{data?.game}</p>
                  <p className="text-xs text-gray-400 italic">“{data?.title}”</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-white">Last streamed</span>{" "}
                    {data?.lastStreamDate ? formatRelativeDate(data.lastStreamDate) : "sometime"}
                  </p>
                  <p className="text-xs text-gray-400 italic">
                    “{data?.title}” on {data?.lastStreamDate ? formatDate(data.lastStreamDate) : "Unknown date"}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Box Art (only desktop) */}
          {isLive && (
            <img
              src={data?.boxArt}
              alt="Game box art"
              className="hidden sm:block w-16 h-24 object-contain rounded"
            />
          )}
        </div>

        {/* Mobile: Box Art + Thumbnail side by side */}
        {isLive && (
          <div className="flex sm:hidden gap-4">
            <img
              src={data?.boxArt}
              alt="Game box art"
              className="w-1/3 object-contain rounded"
            />
            <img
              src={data?.thumbnail}
              alt="Stream thumbnail"
              className="w-2/3 object-cover rounded"
            />
          </div>
        )}

        {/* Desktop: Full-width thumbnail */}
        {isLive && (
          <img
            src={data?.thumbnail}
            alt="Stream thumbnail"
            className="hidden sm:block w-full rounded-lg object-cover"
          />
        )}
      </li>
    );

    return isLive ? (
      <a
        key={index}
        href={`https://twitch.tv/${member.twitch}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {card}
      </a>
    ) : card;
  })}
</ul>
      </section>

      {/* Events Section */}
      <section id="events" className="py-12 px-6 bg-[#1F1F1F]">
        <h2 className="text-3xl font-semibold text-center mb-6">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Example Event Card */}
          <div className="bg-gray-700 rounded-xl p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Thankmas</h3>
            <p className="text-sm">Our seasonal charity arc featuring lore, chaos, and collabs galore.</p>
          </div>
          <div className="bg-gray-700 rounded-xl p-4 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Pride Thingy</h3>
            <p className="text-sm">Something to give back!</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">
          {aboutContent?.title || 'About the Banana'}
        </h2>
        <div className="max-w-2xl mx-auto">
          {aboutContent ? (
            <div className="prose prose-invert mx-auto text-white">
              {documentToReactComponents(aboutContent.content)}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-700 bg-[#1F1F1F]">
        <p>© 2025 Kuma Kollective. All bears reserved.</p>
      </footer>

    </div>
  );
}
