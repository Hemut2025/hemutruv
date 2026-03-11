import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Truck, Network, Target } from "lucide-react";

export function Thesis() {
    return (
        <section className="relative w-full py-20 bg-background" id="thesis">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-30 pointer-events-none" style={{ backgroundImage: "url('/home-bg-1.png')" }}></div>
            <div className="relative z-10 max-w-6xl mx-auto px-4">
                <div className="mb-16 max-w-3xl mx-auto text-center">
                    <h2 className="text-41 md:text-48 font-tobias font-700 tracking-tight mb-4 text-white">
                        The Infrastructure Layer
                    </h2>
                    <p className="text-19 md:text-21 leading-28 font-oldschool-grotesk font-300 text-white-smoke-1">
                        Brokers currently extract $102B in margin without adding intelligence. Hemut is building the AI-native TMS and direct freight network to connect shippers specifically to verified capacity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-border shadow-sm hover:shadow-md transition-shadow bg-surface">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 bg-pastel-orange/10 text-pastel-orange rounded-lg flex items-center justify-center mb-4 border border-pastel-orange/20">
                                <Network className="w-6 h-6" />
                            </div>
                            <CardTitle className="text-21 font-tobias font-700 text-white">AI-Native TMS</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-15 text-white-smoke font-oldschool-grotesk font-300 leading-24">
                                Automates quoting, dispatch, and billing for fleets. Reduces onboarding time by 6x with our parallel "Command + Core" integration.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border shadow-sm hover:shadow-md transition-shadow bg-surface">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 bg-pastel-orange/10 text-pastel-orange-1 rounded-lg flex items-center justify-center mb-4">
                                <Truck className="w-6 h-6" />
                            </div>
                            <CardTitle className="text-21 font-tobias font-700 text-white">$0 Compliance Hardware</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-15 text-white-smoke font-oldschool-grotesk font-300 leading-24">
                                The Hemut Embedded Logging Device (HELD) replaces $500 ELD hardware, aggregating drivers at scale with negligible acquisition costs.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border shadow-sm hover:shadow-md transition-shadow bg-surface">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 bg-pastel-orange/10 text-pastel-orange-1 rounded-lg flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6" />
                            </div>
                            <CardTitle className="text-21 font-tobias font-700 text-white">The Direct Network</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-15 text-white-smoke font-oldschool-grotesk font-300 leading-24">
                                Shippers post freight. Verified drivers accept directly. Hemut replaces the 15-30% broker fee with a simple 1% network toll.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-border shadow-sm hover:shadow-md transition-shadow bg-surface">
                        <CardHeader className="pb-4">
                            <div className="w-12 h-12 bg-pastel-orange/10 text-pastel-orange-1 rounded-lg flex items-center justify-center mb-4">
                                <Target className="w-6 h-6" />
                            </div>
                            <CardTitle className="text-21 font-tobias font-700 text-white">Proven Traction</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-15 text-white-smoke font-oldschool-grotesk font-300 leading-24">
                                $240K live ARR with mid-market fleets. $2.8M in active sales pipeline. Compounding revenue via Software ($100/truck) and Fuel Cards.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
