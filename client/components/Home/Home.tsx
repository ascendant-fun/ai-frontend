import HomeMain from './HomeMain';
import HomeMint from './HomeMint';
import HomeTests from './HomeTests';
import HomeAbout from './HomeAbout';
import HomeTeam from './HomeTeam'
import HomeRoadmap from './HomeRoadmap/HomeRoadmap';

function Home() {
    return (
        <div className="bg-darker pt-16">
            <HomeMain />
            <HomeMint />
            <HomeTests />
            <HomeAbout />
            <HomeTeam />
            <HomeRoadmap />
        </div>
    );
}

export default Home;