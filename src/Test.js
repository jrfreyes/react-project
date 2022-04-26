import './Test.css';
import HealthData from './HealthData';

function Test() {
    return (
        <div className="Test">
            <div className="SideBar">
                <button>Health Data</button>
                <button>Recommendations</button>
                <button>Statistics</button>
                <button>Pill Intake</button>
            </div>
            <HealthData/>
            {/* <Recommendations/>
            <Statistics/>
            <PillIntake/> */}
        </div>
    );
}

export default Test;