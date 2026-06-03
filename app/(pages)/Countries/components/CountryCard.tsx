import Link from "next/link";

export interface Country {
  id: number;
  documentId: string;  // используется в URL для Strapi v5
  name: string;
  nameEn: string;
  description: string;
  imageUrl: string;
  flagUrl: string;
  href: string;
}

export default function CountryCard({ country }: { country: Country }) {
  return (
    <div className="group flex flex-col w-full p-[10px] pb-[20px] gap-[10px] rounded-[16px] border border-[#EAECF0] bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Фоновая картинка */}
      <div className="relative h-[180px] rounded-[8px] overflow-hidden bg-slate-200">
        {country.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={country.imageUrl}
            alt={country.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-200" />
        )}
      </div>

      {/* Флаг + название */}
      <div className="flex items-center gap-3 bg-[#F9FAFB] rounded-[8px] p-3">
        {country.flagUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={country.flagUrl}
            alt={`Флаг ${country.name}`}
            className="w-6 h-4 shrink-0 rounded-[2px] object-cover"
          />
        ) : null}
        <div>
          <p className="text-sm font-bold text-[#101828] leading-tight">{country.name}</p>
          <p className="text-xs text-[#667085] leading-tight">{country.nameEn}</p>
        </div>
      </div>

      {/* Описание */}
      <p className="text-xs text-[#344054] leading-relaxed px-1 flex-1">{country.description}</p>

      {/* Кнопка — используем documentId для совместимости со Strapi v5 */}
      <Link
        href={`/Countries/${country.documentId}`}
        className="mt-auto flex items-center justify-center h-9 rounded-[8px] border border-[#1570EF] text-[#1570EF] text-xs font-semibold bg-transparent hover:bg-[#1570EF] hover:text-white transition-colors duration-200"
      >
        Подробнее о стране
      </Link>
    </div>
  );
}
