import ProfileAvatar from '@/modules/app/profile/profile-avatar';
import ProfileCover from '@/modules/app/profile/profile-cover';

const user = {
  accountType: 'user',
  firstname: 'mohammed',
  lastname: 'younes',
  username: 'mohammed',
};

export default function Profile() {
  return (
    <div className="flex flex-1 flex-col gap-4 px-4 w-full mx-auto max-w-xxl">
      <div className="bg-card rounded-xl p-4">
        {/* Cover Image */}
        <ProfileCover />

        {/* Content Section */}
        {user && <ProfileAvatar items={user} />}

        <div className="flex items-end justify-between w-full gap-1 mt-2">

          {/* <div className="flex gap-4">
            <h2 className="text-roodx-paragrafText">
              125 <span className=" font-bold">Followers</span>
            </h2>
            <h2 className="text-roodx-paragrafText">
              125K <span className=" font-bold">Following</span>
            </h2>
          </div> */}

          <div className="flex gap-2">
            {/* {user && <EditProfile items={user} />}
            <ProfileOption /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
