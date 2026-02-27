const TopUGCQualityScores = () => {
  return (
    <div className="bg-white rounded-[32px] border border-[#F2F4F7] p-8 shadow-sm flex flex-col h-[450px]">
        
      <p className="text-sm font-bold text-[#0A0A30] mb-8">Soap Campaign</p>
      
      {/* Donut Chart Simulation */}
      <div className="flex-grow flex flex-col items-center justify-center relative">
        <div className="w-32 h-32 rounded-full border-[12px] border-[#F2F4F7] relative flex items-center justify-center">
           {/* Visual trick for the gradient partial border */}
           <div className="absolute inset-[-12px] rounded-full border-[12px] border-transparent border-t-orange-400 border-r-indigo-500 border-b-indigo-400 rotate-45" />
           <div className="text-center">
             <p className="text-[10px] text-[#667085] font-medium leading-none">total score:</p>
             <p className="text-2xl font-bold text-[#0A0A30] mt-1">75%</p>
           </div>
        </div>
      </div>

      {/* Metrics List */}
      <div className="mt-8 space-y-5">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#98A2B3] font-medium">Creativity:</span>
          <span className="font-bold text-[#0A0A30]">8/10</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#98A2B3] font-medium">Clarity:</span>
          <span className="font-bold text-[#0A0A30]">60%</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[#98A2B3] font-medium">Engagement:</span>
          <span className="font-bold text-[#0A0A30]">Low</span>
        </div>
      </div>
    </div>
  );
};

export default TopUGCQualityScores;