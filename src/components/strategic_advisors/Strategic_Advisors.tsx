import { FaUserMd, FaUserTie } from "react-icons/fa";
import Title from "../title/Title";
import Image from "next/image";
const Strategic_Advisors = () => {

  const strategicAdvisors = [
    {
      name: "Emily Wilson",
      title: "Chief Medical Officer",
      photo: "/team/Profile Picture-02.jpg",
      bio: "Board-certified physician leading clinical quality and compliance initiatives."
    },
    {
      name: "Sarah Johnson",
      title: "Chief Operations Officer",
      photo: "/team/Profile Picture-04.jpg",
      bio: "Specializes in operational efficiency and staff development for healthcare providers."
    }

  ]


  return (

    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className=" max-w-[1440px] mx-auto w-11/12 flex items-center flex-col-reverse lg:flex-row justify-between gap-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full lg:w-1/2">
          {strategicAdvisors.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow relative group">
              <div className="aspect-w-3 aspect-h-3 relative">
                <Image
                  src={member.photo}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="object-cover w-full h-[500px] lg:h-[400px]"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                <h3 className="text-xl font-semibold text-white text-shadow-[#ffdb61] text-shadow-2xs">{member.name}</h3>
                <p className="accent-text-color font-medium">{member.title}</p>
                <p className="mt-3 text-gray-200">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col items-start text-start lg:items-end lg:text-end lg:max-w-xl lg:w-1/2">
          <Title heading="Strategic Advisors" paragraph="We&apos;re proud to be guided by trusted advisors whose decades of
          expertise shape our strategy and vision."/>
        </div>

      </div>
    </section>
  );
};

export default Strategic_Advisors;
