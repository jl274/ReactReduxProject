import { Link } from 'react-router-dom';
import '../styles/Dashboard.scss';

const Dashboard = () => {

    return (
        <div className="dashboard">
            <h2>Welcome</h2>
            <h3>Where do you want to go?</h3>
            <div className="options">
                <Link to="/users">
                    <div className="option">Users <div>🤵</div></div>
                </Link>
                <Link to="/products">
                    <div className="option">Products <div>🛒</div></div>
                </Link>
            </div>
        </div>
    )
};

export default Dashboard;