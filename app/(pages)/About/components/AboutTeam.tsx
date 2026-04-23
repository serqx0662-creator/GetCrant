import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  edu: string;
  avatar: string;
}

const team: TeamMember[] = [
  { name: "Айгерим Бекова",    role: "Основатель & CEO",  edu: "Harvard Business School, MBA",                     avatar: "/image/OnlinePrep/Alex Brown.png"    },
  { name: "Даниил Ким",        role: "CTO",                edu: "Stanford University, MS Computer Science",         avatar: "/image/OnlinePrep/David.jpg"         },
  { name: "Лейла Садуллаева",  role: "CFO",                edu: "MIT, MBA Finance",                                 avatar: "/image/OnlinePrep/Elena Smith.png"   },
  { name: "Рустам Исаев",      role: "CMO",                edu: "University of California, Berkeley, BA Marketing", avatar: "/image/OnlinePrep/John Doe.png"       },
  { name: "Анастасия Петрова", role: "COO",                edu: "London School of Economics, MSc Management",       avatar: "/image/OnlinePrep/linda.jpg"          },
  { name: "Нурлан Султанов",   role: "VP of Engineering",  edu: "California Institute of Technology, PhD Robotics", avatar: "/image/OnlinePrep/Maria Johnson.png"  },
];

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white border border-[#EAECF0] rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-100">
      <div className="w-20 h-20 shrink-0 rounded-2xl overflow-hidden bg-gray-200">
        <Image
          src={member.avatar}
          alt={member.name}
          width={80}
          height={80}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
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
