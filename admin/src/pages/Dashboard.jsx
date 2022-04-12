import "../css/dashboard.css";
import Navbar from "../app/components/Navbar";

function Dashboard() {
  return (
    <>
      <div className="container2">
        <div>
          <h1 name="dashboardh1">Main Campus Status:</h1>
        </div>

        <div className="flex-container">
          <div>
            <h4>Gate 1</h4>
            <p>
              <span className="dot2"></span>Allowed: 1000
            </p>
            <p className="rejected">
              <span className="dot"></span>Rejected: 150
            </p>
          </div>
          <div>
            <h4>Gate 2</h4>
            <p>
              <span className="dot2"></span>Allowed: 800
            </p>
            <p className="rejected">
              <span className="dot"></span>Rejected: 250
            </p>
          </div>
          <div>
            <h4>Gate 3</h4>
            <p>
              <span className="dot2"></span>Allowed: 600
            </p>
            <p className="rejected">
              <span className="dot"></span>Rejected: 350
            </p>
          </div>
          <div>
            <h4>Gate 4</h4>
            <p>
              <span className="dot2"></span>Allowed: 45
            </p>
            <p className="rejected">
              <span className="dot"></span>Rejected: 65
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
