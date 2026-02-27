const CreatorsInsight = () => {
  const regions = [
    { name: "Nigeria", percentage: 60, color: "bg-blue-600" },
    { name: "South America", percentage: 50, color: "bg-orange-500" },
    { name: "Russia", percentage: 60, color: "bg-[#040136]" },
    { name: "France", percentage: 60, color: "bg-blue-400" },
    { name: "Korea", percentage: 60, color: "bg-green-600" },
  ];

  return (
    <div className="bg-white rounded-[32px] border border-[#F2F4F7] p-10 shadow-sm">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-50 mb-10 pb-4">
        {["Countries", "Genders", "Age Groups"].map((tab, i) => (
          <button key={tab} className={`text-sm font-bold ${i === 0 ? "text-[#0A0A30] border-b-2 border-[#0A0A30] pb-4 -mb-[18px]" : "text-[#98A2B3]"}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Map Placeholder */}
        <div className="relative aspect-video bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
           <img src="/Earth.svg" alt="Map" className="w-full h-full object-contain  p-4" />
        </div>

        {/* Right: Region List */}
        <div className="space-y-6">
          {regions.map((region) => (
            <div key={region.name} className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-[#0A0A30]">
                <span>{region.name}</span>
                <span className="text-[#98A2B3]">{region.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                <div className={`h-full ${region.color} rounded-full`} style={{ width: `${region.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorsInsight;