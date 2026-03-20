import Image from "next/image";

export function Team() {
    const teamMembers = [
        {
            name: "Loki Cheema",
            role: "Founder",
            background: "Native Trucking Operator",
            bio: "Started in trucking at 16, pulling 100-hour weeks. Managed fleets for 6 years. Lived every role Hemut is building infrastructure for.",
            imageUrl: "/loki-cheema.jpg" // The user will place the headshot here
        },
        {
            name: "World-Class Engineering",
            role: "15+ Engineers",
            background: "Meta, Uber, Crowdstrike",
            bio: "Supported by a technical powerhouse team with backgrounds across Capital One and Cadence, guided by top-tier advisors from Optimizely, Confluent, and Fanatics.",
            imageUrl: "/hemut-square-logo.png"
        }
    ];

    return (
        <section className="relative w-full py-20 bg-background" id="team">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: "url('/home-bg-1.png')" }}></div>
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-41 md:text-48 font-tobias font-700 tracking-tight mb-4 text-white">
                        The Team
                    </h2>
                    <p className="text-19 md:text-21 leading-28 font-oldschool-grotesk font-300 text-white-smoke-1 max-w-2xl mx-auto">
                        Led by a trucking-native founder and backed by world-class software engineers who embed directly alongside fleet dispatchers.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto justify-items-center">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 group">
                            <div className="shrink-0">
                                {member.imageUrl ? (
                                    <div className="w-24 h-24 rounded-full bg-surface border-2 border-pastel-orange flex items-center justify-center overflow-hidden relative">
                                        <Image src={member.imageUrl} alt={member.name} fill className={member.imageUrl === "/hemut-logo-v2.png" ? "object-contain p-3" : "object-cover"} />
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-surface border-2 border-pastel-orange flex items-center justify-center overflow-hidden">
                                        <svg className="w-10 h-10 text-pastel-orange" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2 pt-2">
                                <div>
                                    <h3 className="text-21 font-tobias font-700 text-white">{member.name}</h3>
                                    <p className="text-pastel-orange font-600 font-oldschool-grotesk tracking-wide mb-1 text-15">{member.role}</p>
                                </div>
                                <p className="text-13 font-600 font-oldschool-grotesk text-dark-gray-1 uppercase tracking-100">
                                    {member.background}
                                </p>
                                <p className="text-white-smoke tracking-0288 text-15 leading-24 font-oldschool-grotesk font-300 mt-2">
                                    {member.bio}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
