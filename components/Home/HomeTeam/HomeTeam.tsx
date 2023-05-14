import TeamMember, { TeamMemberProps } from "./TeamMember";

const members: TeamMemberProps[] = [
    {
        name: 'ZackStonk',
        role: 'Strategy & BD',
        image: '/images/team/zackstonk.png',
        experiences: [
            '<span class="text-yellow">5 Years</span> TMT investment with total investment amount of US$2.0bn',
            '<span class="text-yellow">5 Years</span> crypto investment',
            'Founded Alibaba NFT Marketplace',
            'Founder of Web3 incubator'
        ],
    },
    {
        name: 'Helenistic',
        role: 'Product Manager',
        image: '/images/team/helenistic.png',
        experiences: [
            '<span class="text-yellow">5+ Years</span> product design experience on content community and viral growth features',
            'U.C. Berkeley graduate on <span class="text-yellow">personality psychology</span>',
            '<span class="text-yellow">Astrology enthusiast</span>'
        ],
    },
    {
        name: '10',
        role: 'Prof. Astrologist',
        image: '/images/team/10.png',
        experiences: [
            'ISAR certified astrologer with <span class="text-yellow">5+ Year</span> experience',
            '<span class="text-yellow">10+ Year</span> mystical service expert',
            '<span class="text-yellow">A natural psychic and fortune teller</span>: precisely predicted Russia-Ukraine conflict 6 months earlier'
        ],
    },
    {
        name: 'Deimante',
        role: 'Prof. Astrologist',
        image: '/images/team/deimante.png',
        experiences: [
            'Core member of The <span class="text-yellow">Astrological Association</span>',
            'Founded astrology education institution in 2018',
            '<span class="text-yellow">2 Year</span> leading marketing in HODL Finance'
        ],
    },
    {
        name: 'BB',
        role: 'Data Scientist',
        image: '/images/team/bb.png',
        experiences: [
            '<span class="text-yellow">15 Years</span> R&D Experience',
            'Former Dept head of Alibaba search&recommendation algorithm',
            '<span class="text-yellow">5 Year</span> AI engineer',
            '<span class="text-yellow">3 Year</span> BI experience',
            '<span class="text-yellow">8 Year</span> full-stack R&D',
        ],
    },
    {
        name: 'polyphylla',
        role: 'Product Design',
        image: '/images/team/polyphylla.png',
        experiences: [
            '<span class="text-yellow">10 Years design experience</span>',
            '<span class="text-yellow">Senior product designer</span>  at Silicon Valley big tech company',
            'Designed for 3+ startups'
        ],
    },
];

function HomeTeam() {
    return (
        <section className="min-h-screen mt-4 pb-20" id="home-team">
            <div className="grid md:grid-cols-2 mt-8 mb-12">
                <div className="pt-12 pb-24 px-4 md:px-14 z-20">
                    <h2 className="text-primary/70 text-xl font-raleway uppercase">
                        <span className="mr-3">/</span>
                        About the team
                    </h2>
                    <h3 className="mt-6 text-4xl space-y-2 font-gallient text-transparent bg-clip-text bg-gradient-to-t from-primary to-white">
                        Inventore veritatis et quasi
                        <br />
                        eaque ipsa quae ab
                    </h3>
                </div>
                <div className="mt-auto px-4 md:max-w-md">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                    <br /><br />
                    eaque ipsa quae ab illo inventore veritatis et quasi  eaque ipsa quae ab illo inventore veritatis et quasi
                </div>
            </div>
            <div className="mt-16 grid grid-flow-col overflow-x-scroll px-2 md:px-16">
                {
                    members.map(member => (
                        <TeamMember
                            key={member.name}
                            name={member.name}
                            role={member.role}
                            image={member.image}
                            experiences={member.experiences}
                        />
                    ))
                }
            </div>
            <div className="w-full mt-16 primary-gradient h-[0.5px] z-0 hidden sm:block"></div>
        </section>
    );
}

export default HomeTeam;