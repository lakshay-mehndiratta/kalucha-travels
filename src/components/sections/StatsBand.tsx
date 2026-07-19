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
    <div className="bg-navy-deep text-white py-9 sm:py-11">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-y-7 sm:gap-y-0 text-center">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const isLastInRow = i === 1 || i === stats.length - 1;
          return (
            <div
              key={stat.label}
              className={`${
                !isLastInRow ? "border-r border-white/10" : ""
              } sm:border-r ${
                i === stats.length - 1 ? "sm:border-r-0" : ""
              }`}
            >
              <Icon className="text-orange text-2xl mb-2.5 mx-auto" />
              <b className="block text-[22px] sm:text-[26px] font-serif">
                {stat.value}
              </b>
              <span className="text-[11.5px] sm:text-[12.5px] text-[#a9b6bc]">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}