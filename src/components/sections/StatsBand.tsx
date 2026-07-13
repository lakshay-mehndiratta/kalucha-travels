import {
  FaPassport,
  FaMedal,
  FaEarthAmericas,
  FaUsers,
} from "react-icons/fa6";

const stats = [
  { icon: FaPassport, value: "150+", label: "Visa Approved Monthly" },
  { icon: FaMedal, value: "5+", label: "Years of Experience" },
  { icon: FaEarthAmericas, value: "100+", label: "Destinations Worldwide" },
  { icon: FaUsers, value: "5000+", label: "Happy Customers" },
];

export default function StatsBand() {
  return (
    <div className="bg-navy-deep text-white py-11">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-4 text-center">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${
                i !== stats.length - 1 ? "border-r border-white/10" : ""
              }`}
            >
              <Icon className="text-orange text-2xl mb-2.5 mx-auto" />
              <b className="block text-[26px] font-serif">{stat.value}</b>
              <span className="text-[12.5px] text-[#a9b6bc]">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}