/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import CustomInput from '@/components/CustomInput';
import { useModal } from '@/components/GlobalModal';
import FeedBack from '@/components/FeedBack';

const SubmitUrl = ({ onSubmit = (data: any) => console.log(data) }) => {
  const { open } = useModal()
  const [platforms, setPlatforms] = useState([
    { id: 1, platform: '', url: '' }
  ]);

  const addPlatform = () => {
    setPlatforms([
      ...platforms,
      { id: Date.now(), platform: '', url: '' }
    ]);
  };

  const removePlatform = (id: any) => {
    if (platforms.length > 1) {
      setPlatforms(platforms.filter(p => p.id !== id));
    }
  };

  const updatePlatform = (id: number, field: string, value: string) => {
    setPlatforms(platforms.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleSubmit = () => {
    onSubmit(platforms);
    open(<FeedBack  /> )
  };

  return (
    <div className=" bg-gray-50 flex items-center justify-center md:min-w-lg">
      <div className="w-full  bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-xl text-center font-medium text-secondary-100 mb-6">Submit Url</h2>
        <div className="space-y-6">
          {platforms.map((item, index) => (
            <div key={item.id} className="space-y-4">
              <div className="flex items-center justify-between">

                {platforms.length > 1 && (
                  <button
                    onClick={() => removePlatform(item.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <CustomInput 
              label='What social media platform is it posted on?'
                type="text"
                placeholder="Social Media"
                value={item.platform}
                onChange={(e) => updatePlatform(item.id, 'platform', e.target.value)}
                className='mb-5'
              />


              <div>

                <CustomInput label='Share Post URL' placeholder="https://www.example.com/" value={item.url} onChange={(e) => updatePlatform(item.id, 'url', e.target.value)} />
              </div>

              {index < platforms.length - 1 && (
                <div className="border-b border-gray-100 pt-4"></div>
              )}
            </div>
          ))}

          <button
            onClick={addPlatform}
            className="w-full py-3 text-gray-500 text-base font-medium flex items-center justify-center gap-2 hover:text-gray-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Social Media Platform
          </button>

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-950 text-white py-4 rounded-full text-base font-medium hover:bg-indigo-900 transition-colors mt-8"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitUrl