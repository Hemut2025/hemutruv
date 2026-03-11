import { Card, CardContent } from "./ui/card";
import { CheckCircle2 } from "lucide-react";

export function WhyNow() {
    return (
        <section className="relative w-full py-20 bg-background" id="why-now">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: "url('/home-bg-1.png')" }}></div>
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-41 md:text-48 font-tobias font-700 tracking-tight mb-4 text-white">
                        Why This Round
                    </h2>
                    <p className="text-19 md:text-21 leading-28 font-oldschool-grotesk font-300 text-white-smoke-1 max-w-2xl mx-auto">
                        Hemut has derisked the initial GTM motion. We are raising additional capital to accelerate our FDE deployment model and compound our software/fuel wedge into a true network effect.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <Card className="border-border shadow-md bg-surface">
                        <CardContent className="p-8 space-y-6">
                            <div>
                                <h3 className="text-13 font-700 tracking-0832 text-pastel-orange uppercase mb-2 font-oldschool-grotesk">Round Structure</h3>
                                <p className="text-21 sm:text-24 font-tobias font-700 text-white leading-28">Friends & Family / Seed Ext.</p>
                            </div>
                            <div className="pt-4">
                                <p className="text-15 text-dark-gray-1 mb-1 font-oldschool-grotesk">Target Raise via RUV</p>
                                <p className="text-21 font-700 text-white font-oldschool-grotesk">Up to $700k</p>
                            </div>
                            <div className="pt-4">
                                <p className="text-15 text-dark-gray-1 mb-1 font-oldschool-grotesk">Valuation Cap Range</p>
                                <p className="text-21 font-700 text-white font-oldschool-grotesk">$45M &ndash; $50M</p>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <h3 className="text-24 font-tobias font-700 text-white">Execution Strategy</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-pastel-orange shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block text-white mb-1 font-oldschool-grotesk font-600 text-17">GTM A: Forward Deployed Engineering</strong>
                                    <span className="text-white-smoke text-15 font-oldschool-grotesk leading-24">Deploying engineers inside mid-market fleets to build our Enterprise TMS alongside their dispatchers, drastically shortening sales cycles.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-pastel-orange shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block text-white mb-1 font-oldschool-grotesk font-600 text-17">GTM B: Owner-Operator Wedge</strong>
                                    <span className="text-white-smoke text-15 font-oldschool-grotesk leading-24">Aggregating the long-tail of supply by subsidizing their $500 compliance hardware costs and offering a profitable Fuel Card.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-pastel-orange shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block text-white mb-1 font-oldschool-grotesk font-600 text-17">Direct Network Economics</strong>
                                    <span className="text-white-smoke text-15 font-oldschool-grotesk leading-24">Once peak network density is reached via our SaaS and financial tools, we unlock the scalable 1% automated direct freight network fee.</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
