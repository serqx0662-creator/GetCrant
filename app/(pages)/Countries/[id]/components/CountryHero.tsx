interface CountryHeroProps {  bannerImage: string;
  name: string;
  flagImage: string;
  description: string;
}

// eslint-disable-next-line @next/next/no-img-element
export default function CountryHero({ bannerImage, name, flagImage, description }: CountryHeroProps) {
  return (
    <section className="relative w-full h-[250px] sm:h-[450px] overflow-hidden mb-16">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={bannerImage} alt={name} className="w-full h-full object-cover object-center" />
      <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto bg-white rounded-xl shadow-md px-4 py-3 sm:px-5 flex flex-row items-start sm:items-center gap-3 sm:w-[480px] h-auto pb-4">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-[#EAECF0] mt-0.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flagImage} alt={`Флаг ${name}`} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-[16px] font-bold text-[#101828] leading-tight">{name}</p>
          <p className="text-[#667085] text-[13px] leading-snug">{description}</p>
        </div>
      </div>
    </section>
  );
}
