export default function KumaKollectiveWebsite() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
        <div className="text-2xl font-bold tracking-wide">Kuma Kollective</div>
        <nav className="space-x-4">
          <a href="#home" className="hover:text-amber-400">Home</a>
          <a href="#members" className="hover:text-amber-400">Members</a>
          <a href="#events" className="hover:text-amber-400">Events</a>
          <a href="#streams" className="hover:text-amber-400">Streams</a>
          <a href="#about" className="hover:text-amber-400">About</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">We're totally not a cult.</h1>
        <p className="text-lg mb-6">Meet the bears behind the magic!</p>
        <div className="space-x-4">
          <button className="bg-amber-400 text-black px-4 py-2 rounded-xl hover:bg-amber-300">
            Meet the Kollective
          </button>
          <button className="bg-transparent border border-white px-4 py-2 rounded-xl hover:bg-white hover:text-black">
            Watch Live
          </button>
        </div>
      </section>

      {/* Members Polaroid Section */}
      <section id="members" className="py-12 px-6 bg-gray-850">
        <h2 className="text-3xl font-semibold text-center mb-10">Our Members</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {["Jirō", "Berri", "Icey", "Sucrose", "Nummi"].map((name, index) => (
            <div
              key={index}
              className="w-40 h-52 bg-white text-black p-2 rounded shadow-lg transform hover:rotate-1 hover:scale-105 transition duration-300"
            >
              <div className="bg-gray-300 w-full h-36 mb-2 rounded">Polaroid Img</div>
              <div className="text-center font-bold">{name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-12 px-6">
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

      {/* Streams Section */}
      <section id="streams" className="py-12 px-6 bg-gray-850">
        <h2 className="text-3xl font-semibold text-center mb-6">Who’s Live?</h2>
        <p className="text-center text-sm text-gray-400 mb-4">Live stream embeds or Twitch info can go here.</p>
        <div className="w-full h-64 bg-gray-700 rounded-xl flex items-center justify-center text-gray-400">
          [Twitch Embed Placeholder]
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-6">About the Kollective</h2>
        <p className="max-w-2xl mx-auto text-center">
          The Kuma Kollective is a group of bear-themed VTubers working together to bring cozy chaos, charitable streams,
          and creative storytelling to the den. We love sour candy!
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-400 border-t border-gray-700">
        <p>© 2025 Kuma Kollective. All bears reserved.</p>
      </footer>
    </div>
  );
}
