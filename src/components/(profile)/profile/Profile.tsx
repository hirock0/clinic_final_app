import BackBtn from "@/components/ui/btns/backBtn/BackBtn";
import { FaUserPlus, FaCommentDots, FaLock } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { VerifyToken } from "@/app/actions/apis/Apis";
const Profile = async () => {
  const user = await VerifyToken();

  return (
    <main className="relative">
      <div className="min-h-screen max-w-[1440px] w-11/12 mx-auto flex flex-col items-center justify-center main-bg-color overflow-hidden">
        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <BackBtn />
        </div>

        {/* Background Circles */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#308d89]/10 rounded-full blur-3xl" />
        <div className="absolute top-32 right-20 w-32 h-32 bg-[#ffdb61]/20 rounded-full blur-2xl" />
        <div className="absolute bottom-16 left-1/3 w-24 h-24 bg-[#308d89]/10 rounded-full blur-xl" />
        <div className="h-[50vh] absolute left-0 right-0 top-0 accent-bg-color" />

        {/* Profile Card */}
        <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-md p-6 pt-16 text-center z-10">
          {/* Top Actions */}

          <Link href={"/contact"}>
            <div className="absolute top-4 right-4 text-[--primary] text-sm flex items-center gap-2 cursor-pointer">
              <FaCommentDots /> Message
            </div>
          </Link>



          {/* Avatar */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="w-28 h-28 rounded-full overflow-hidden">
              <Image
                src={user?.image?.secure_url}
                alt="profile"
                width={500}
                height={500}
                className=" w-full h-full border-4 border-white shadow-md object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <h1 className="text-xl font-semibold main-text-color mt-4">
            {user?.name}
          </h1>
          <h1 className="text-xl font-semibold main-text-color mt-4">
            {user?.email}
          </h1>

          {/* Reset Password Button */}
          <Link href={"/password_reset"}>
            <button className="mt-6 purple-color-btn hover:opacity-90 text-[--text] py-2 px-6 rounded-full shadow-md text-sm flex items-center justify-center gap-2 mx-auto transition">
              <FaLock /> Reset Password
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Profile;
