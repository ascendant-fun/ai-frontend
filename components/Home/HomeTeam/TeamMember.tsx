import Image from "next/image";

export interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
    experiences: string[];
}

function TeamMember({ name, role, image, experiences }: TeamMemberProps) {
    return (
        <div className="mx-4 px-4 flex flex-col justify-items-center w-52">
            <div className="relative w-32 h-32 mx-auto">
                <Image src={image} alt={name} fill />
            </div>
            <div className="text-center">
                <h3 className="mt-6 text-xl font-extrabold">{name}</h3>
                <div className="text-base text-primary mt-2">{role}</div>
            </div>
            <ul className="text-sm mt-4 list-disc scrollbar-hide">
                {
                    experiences.map(experience => (
                        <li key={experience} dangerouslySetInnerHTML={{ __html: experience }}></li>
                    ))
                }
            </ul>
        </div>
    );
}

export default TeamMember;