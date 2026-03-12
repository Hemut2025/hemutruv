export function Footer() {
    return (
        <footer className="w-full py-12 bg-black-2 text-dark-gray text-13 font-oldschool-grotesk">
            <div className="max-w-6xl mx-auto px-4">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-8 gap-4 md:gap-0">
                    <div className="flex flex-col md:flex-row items-start md:items-baseline gap-2 md:gap-6">
                        <h4 className="text-white text-19 font-tobias font-700 tracking-tight">Hemut Co.</h4>
                        <p className="font-300 text-dark-gray-1 text-13">Confidential – Intended for private circulation only.</p>
                    </div>
                    <div>
                        <a href="mailto:invest@hemut.com" className="text-white hover:text-pastel-orange transition-colors font-500 text-15">
                            invest@hemut.com
                        </a>
                    </div>
                </div>

                <div className="space-y-4 max-w-full text-[11px] md:text-13 leading-24 text-dark-gray font-300">
                    <p>
                        Statements in this presentation may contain forward-looking statements involving risks and uncertainties. Past performance is not indicative of future results.
                    </p>
                    <p>
                        <strong>Private Placement Disclaimer:</strong> This document and any associated materials are for informational purposes only and do not constitute an offer to sell or a solicitation of an offer to buy any securities in Hemut Inc. or any related vehicle.
                    </p>
                    <p>
                        <strong>Accredited Investors Only:</strong> Any potential investment opportunity will be made available exclusively to "accredited investors" as defined in Rule 501(a) of Regulation D under the Securities Act of 1933, as amended.
                    </p>
                    <p>
                        <strong>Country Restrictions:</strong> The information contained herein is not intended for distribution to, or use by, any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation. Users are responsible for compliance with all applicable local laws and regulations, including adherence to US sanctions policies regarding designated countries of concern.
                    </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 clear-both">
                    <p className="text-dark-gray-1 text-13 font-300">&copy; {new Date().getFullYear()} Hemut Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
