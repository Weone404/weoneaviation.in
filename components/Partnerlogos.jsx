// components/PartnerLogos.jsx
// Usage: import PartnerLogos from '@/components/PartnerLogos'
// Then add <PartnerLogos /> anywhere in your homepage JSX

import Image from "next/image";

export default function PartnerLogos() {
    const partners = [
        {
            name: "Air India",
            src: "/assets/air-india-logo.png",
            width: 220,
            height: 80,
            href: "https://www.airindia.com/",
        },
        {
            name: "Vistara",
            src: "/vistara.webp",
            width: 200,
            height: 72,
            href: null,
        },
        {
            name: "SpiceJet",
            src: "/assets/SpiceJet-Logo.webp",
            width: 200,
            height: 72,
            href: "https://www.spicejet.com/",
        },
        {
            name: "ISO",
            src: "/iso.webp",
            width: 160,
            height: 80,
            href: "https://www.iso.org/home.html",
        },
        {
            name: "Thomas Cook",
            src: "/thomas-cook.webp",
            width: 220,
            height: 80,
            href: "https://www.thomascook.in/",
        },
        {
            name: "GyanDhan",
            src: "/gyandhan.webp",
            width: 200,
            height: 72,
            href: "https://www.gyandhan.com/",
        },
        {
            name: "Thomas Cook 2",
            src: "/thomas-cook1.webp",
            width: 200,
            height: 72,
            href: "https://www.thomascook.in/",
        },
    ];

    return (
        <section className="partners-bar">
            <div className="partners-inner">
                {partners.map((partner, index) => (
                    <div key={partner.name} className="partner-item">
                        <div className="logo-wrap">
                            {partner.href ? (
                                <a
                                    href={partner.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="logo-link"
                                    aria-label={`Visit ${partner.name}`}
                                >
                                    <Image
                                        src={partner.src}
                                        alt={partner.name}
                                        width={partner.width * 2}
                                        height={partner.height * 2}
                                        style={{
                                            width: "auto",
                                            height: partner.height,
                                            objectFit: "contain",
                                            maxWidth: "100%",
                                        }}
                                        quality={100}
                                        unoptimized
                                    />
                                </a>
                            ) : (
                                <Image
                                    src={partner.src}
                                    alt={partner.name}
                                    width={partner.width * 2}
                                    height={partner.height * 2}
                                    style={{
                                        width: "auto",
                                        height: partner.height,
                                        objectFit: "contain",
                                        maxWidth: "100%",
                                    }}
                                    quality={100}
                                    unoptimized
                                />
                            )}
                        </div>
                        {index < partners.length - 1 && (
                            <span className="divider" aria-hidden="true" />
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
                .partners-bar {
                    width: 100%;
                    background: #eef6fb;
                    padding: 28px 32px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-top: 1px solid #dce9f5;
                    border-bottom: 1px solid #dce9f5;
                }

                .partners-inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    max-width: 1400px;
                    width: 100%;
                    gap: 0;
                }

                .partner-item {
                    display: flex;
                    align-items: center;
                    position: relative;
                }

                .logo-wrap {
                    padding: 0 32px;
                    display: flex;
                    align-items: center;
                    opacity: 0.88;
                    transition: opacity 0.2s ease, transform 0.2s ease;
                }

                .logo-wrap:hover {
                    opacity: 1;
                    transform: scale(1.07);
                }

                .logo-link {
                    display: flex;
                    align-items: center;
                    text-decoration: none;
                    cursor: pointer;
                }

                .divider {
                    width: 1px;
                    height: 52px;
                    background: #b8cfe0;
                    flex-shrink: 0;
                }

                @media (max-width: 900px) {
                    .logo-wrap {
                        padding: 12px 20px;
                    }
                    .divider {
                        display: none;
                    }
                    .partners-inner {
                        gap: 8px;
                    }
                }

                @media (max-width: 480px) {
                    .logo-wrap {
                        padding: 10px 14px;
                    }
                }
            `}</style>
        </section>
    );
}