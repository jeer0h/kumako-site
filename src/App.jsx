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

  useEffect(() => {
    members.forEach(async (member) => {
      const res = await fetch(`/api/twitch-user?login=${member.twitch}`);
      const data = await res.json();
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
          viewers: data.viewers
        },
      }));
    });
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
      <div className="relative bg-cover bg-center" style={{ backgroundImage: "url('/images/hero.png')" }}>
        <div className="absolute inset-0 bg-black/70 z-0" />
        <header className="flex justify-between items-start px-6 py-4 relative z-10">
          <a href="#home" className="relative z-20">
            <img
              src="/images/logo.webp"
              alt="Kuma Kollective Logo"
              className="h-[160px] -mt-8 -mb-8 ml-[-10px] object-contain drop-shadow-xl transition-transform duration-300 hover:rotate-2 hover:scale-105"
            />
          </a>
          <nav className="space-x-4 mt-2 text-white z-20">
            <a href="#members" className="hover:text-amber-400">Members</a>
            <a href="#events" className="hover:text-amber-400">Events</a>
            <a href="#streams" className="hover:text-amber-400">Streams</a>
            <a href="#about" className="hover:text-amber-400">About</a>
          </nav>
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
              <span
                className="absolute top-2 right-2 bg-gray-400 text-white text-xs px-2 py-1 rounded-full animate-pulse"
              >
                {memberData[member.twitch]?.isLive ? "LIVE" : "Offline"}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="streams" className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">Who’s Live?</h2>
        <ul className="max-w-2xl mx-auto space-y-4 mt-8">
          {members.map((member, index) => {
            const data = memberData[member.twitch];
            return (
              <li
                key={index}
                className="bg-gray-800 rounded-xl p-4 shadow flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={data?.avatar}
                    alt={`${member.name}'s Twitch profile picture`}
                    className="w-14 h-14 rounded-full object-cover border-2"
                  />
                  <div>
                    <p className="text-lg font-semibold text-gray-100">{data?.name || member.name}</p>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-white">Last Stream:</span> {data?.title || "Checking..."}
                    </p>
                    <p className="text-xs text-gray-400">{data?.game}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-300 text-sm">
                  <div className="flex items-center gap-1">
                    <span>👁️</span>
                    <span>{data?.viewers || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🤍</span>
                    <span>{data?.followers?.toLocaleString() || 0}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
