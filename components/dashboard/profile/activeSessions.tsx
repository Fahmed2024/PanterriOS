import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';

export function ActiveSessions() {
  const activeDevices = [
    {
      icon: Monitor,
      device: 'Chrome on Windows',
      location: 'Lagos, Nigeria ',
      ipAddress: ' 197.210.226.195',
      activeTime: '2 minutes ago',
      current: true,
    },
    {
      icon: Smartphone,
      device: 'Safari on iPhone',
      location: 'Lagos, Nigeria ',
      ipAddress: ' 197.210.226.195',
      activeTime: ' 2 hours ago',
      current: false,
    },
  ];
  return (
    <div className="rounded-xl shadow p-8">
      <div className="flex justify-between">
        <div className=" flex gap-3 items-center">
          <Monitor className=" text-blue-700" />
          <span className="text-xl font-semibold">Active Sessions</span>
        </div>
        <small
          className="text-xs text-green-500 bg-green-50 p-2
        "
        >
          2 Active
        </small>
      </div>
      <div className="p-2 space-y-4 mt-8">
        {activeDevices.map((device, i) => {
          const Icon = device.icon;
          return (
            <div key={i} className="flex gap-4 w-full shadow rounded-lg p-2">
              <div className="bg-gray-100 w-10 h-10 items-center justify-center flex rounded-md  ">
                <Icon className="w-5 h-5" />
              </div>
              <div className="w-full flex flex-col">
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <div className=" font-semibold">{device.device}</div>
                    {device.current && (
                      <small className="text-xs text-green-500 bg-green-50 p-2 h-fit">
                        current
                      </small>
                    )}
                  </div>
                  {!device.current && (
                    <Button variant={'outline'} className="text-red-500">
                      {' '}
                      SignOut
                    </Button>
                  )}
                </div>
                <small>{`${device.location} • ${device.ipAddress}`} </small>
                <small>Last Active: {device.activeTime}</small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
