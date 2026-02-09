import {
  ActiveSessions,
  ChangePassword,
  ProfileDetails,
  TwoFaBar,
} from '@/components/dashboard';

import { PageHead } from '@/components/shared/';
import { Calendar } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div>
      <PageHead
        pageTitle="Administrator Profile"
        subTitle="Manage your personal information and security settings."
      >
        <div className="flex items-center gap-2">
          <Calendar /> <span> Last Login: Today at 09:41 AM</span>
        </div>
      </PageHead>
      {/* profile head */}
      <ProfileDetails />
      {/* change password */}
      <div className=" my-8 flex  flex-col lg:flex-row lg:gap-8 ">
        <div className="lg:w-3/4 space-y-8">
          <ChangePassword />
          <ActiveSessions />
        </div>
        <div className="lg:w-1/4 space-y-8">
          <TwoFaBar />
        </div>
      </div>
    </div>
  );
}
