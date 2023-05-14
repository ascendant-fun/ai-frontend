import Image from 'next/image'

interface roadmapItem {
    id: number;
    date: String;
    title?: String;
    dateYPosition: String;
    XPosition: string;
    YPosition: string;
    list: string[];
    phase?: {
        subtitle?: String;
        title: String;
        XPosition: String;
        YPosition: String;
    }
};

const roadmapItems: roadmapItem[] = [
    {
        id: 1,
        date: '2022.9',
        dateYPosition: 'md:top-72',
        XPosition: 'md:left-44',
        YPosition: 'md:top-[500px]',
        list: [
            'Incubating product idea',
            'Angel-round financing',
            'Building project team',
            'Founding OG community',
        ],
        phase: {
            title: 'Preparation',
            XPosition: 'md:left-44',
            YPosition: 'md:top-[430px]',
        }
    },
    {
        id: 2,
        date: '2022.11',
        title: 'Feature Shipment Round 1',
        dateYPosition: 'md:top-36',
        XPosition: 'md:left-[500px]',
        YPosition: 'md:top-[270px]',
        list: [
            'PFP Pass NFT',
            'Astro Personality Test',
            'Birth Chart Reading',
        ],
        phase: {
            subtitle: 'Phase 1',
            title: 'Astrology Meta Playground',
            XPosition: 'md:left-[500px]',
            YPosition: 'md:top-0',
        }
    },
    {
        id: 3,
        date: '2022.12',
        title: 'Feature Shipment Round 2',
        dateYPosition: 'md:top-44',
        XPosition: 'md:left-[750px]',
        YPosition: 'md:top-[400px]',
        list: [
            'Fortune Telling',
        ],
    },
    {
        id: 4,
        date: '2023.1',
        title: 'Feature Shipment Round 3',
        dateYPosition: 'md:top-48',
        XPosition: 'md:left-[1000px]',
        YPosition: 'md:top-[300px]',
        list: [
            'Spiritual Pet',
        ],
    },
    {
        id: 5,
        date: '2023.2',
        title: 'Feature Shipment Round 4',
        dateYPosition: 'md:top-52',
        XPosition: 'md:left-[1350px]',
        YPosition: 'md:top-[350px]',
        list: [
            'Relationship Chart Reading',
        ],
    },
    {
        id: 6,
        date: '2023.4',
        title: 'Community Ready',
        dateYPosition: 'md:top-40',
        XPosition: 'md:left-[1700px]',
        YPosition: 'md:top-[350px]',
        list: [],
        phase: {
            subtitle: 'Phase 2',
            title: 'Community',
            XPosition: 'md:left-[1350px]',
            YPosition: 'md:top-0'
        }
    },
];

function HomeRoadmap() {
    return (
        <section id="home-roadmap">
            <div className="overflow-x-scroll py-12 md:pt-44 md:pb-64 mt-12 scrollbar-hide overflow-y-auto relative">
                <div className="hidden md:block w-[2000px] h-56 relative">
                    <Image src='/images/roadmap.png' fill alt="Roadmap" className="object-fill" />
                </div>
                <h2 className="block md:hidden text-primary/70 text-lg font-raleway uppercase">
                    <span className="mr-3">/</span>
                    Roadmap
                </h2>
                {
                    roadmapItems.map(roadmapItem => (
                        <div key={roadmapItem.id} className="my-8 px-6 space-y-3">
                            {
                                roadmapItem?.phase !== undefined && (
                                    <div
                                        className={`md:absolute my-8 md:my-0 md:w-60 ${roadmapItem.phase.XPosition} ${roadmapItem.phase.YPosition}`}
                                    >
                                        {
                                            roadmapItem.phase?.subtitle !== undefined && (
                                                <h3 className="text-primary/70 text-lg font-raleway uppercase">
                                                    <span className="mr-3">/</span>
                                                    {roadmapItem.phase.subtitle}
                                                </h3>
                                            )
                                        }
                                        <h4 className="mt-6 text-3xl space-y-2 font-gallient text-transparent bg-clip-text bg-gradient-to-t from-primary to-white">
                                            {roadmapItem.phase.title}
                                        </h4>
                                    </div>
                                )
                            }
                            <div className={`md:absolute text-xl ${roadmapItem.XPosition} ${roadmapItem.dateYPosition}`}>
                                {roadmapItem.date}
                            </div>
                            <div
                                className={`md:absolute w-60 ${roadmapItem.XPosition} ${roadmapItem.YPosition}`}
                            >
                                {
                                    'title' in roadmapItem && (
                                        <h4>{roadmapItem.title}</h4>
                                    )
                                }
                                {
                                    roadmapItem.list.length > 0 && (
                                        <ul className="list-disc pl-6">
                                            {
                                                roadmapItem.list.map(item => (
                                                    <li key={item}>{item}</li>
                                                ))
                                            }
                                        </ul>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
}

export default HomeRoadmap;