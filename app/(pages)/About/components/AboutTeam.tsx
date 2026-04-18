const team = [
  { name: "Айгерим Бекова",   role: "Основатель & CEO",    edu: "Harvard Business School, MBA" },
  { name: "Даниил Ким",       role: "CTO",                  edu: "Stanford University, MS Computer Science" },
  { name: "Лейла Садуллаева", role: "CFO",                  edu: "MIT, MBA Finance" },
  { name: "Рустам Исаев",     role: "CMO",                  edu: "University of California, Berkeley, BA Marketing" },
  { name: "Анастасия Петрова",role: "COO",                  edu: "London School of Economics, MSc Management" },
  { name: "Нурлан Султанов",  role: "VP of Engineering",    edu: "California Institute of Technology, PhD Robotics" },
];

function TeamCard({ member }: { member: typeof team[0] }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white border border-[#EAECF0] rounded-2xl shadow-sm">
      {/* Аватар-заглушка */}
      <div className="w-[80px] h-[80px] flex-shrink-0 rounded-2xl bg-gray-200" />

      {/* Текст */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <p className="text-sm font-bold text-slate-900 leading-tight">{member.name}</p>
        <p className="text-xs font-semibold text-blue-600">{member.role}</p>
        <p className="text-xs text-slate-500 leading-relaxed mt-1">{member.edu}</p>
      </div>
    </div>
  );
}

export default function AboutTeam() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold text-slate-900">Наша команда</h2>
        <p className="mt-2 text-sm text-slate-500 mb-10">
          Эксперты с реальным опытом поступления в топовые университеты мира
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {team.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </section>
  );
}
