import "../dashboard.css"
import Header from '../app/components/sidenav';

function Dashboard() {
  return (<>

<Header/>


<div class="container2">
  <div>
<h1 name="dashboardh1">Admin Dashboard</h1>
<h1 name="dashboardh1">Main Campus Status:</h1> 
</div>

<div class="flex-container">

  <div>
  <h4>Gate 1</h4>  
  <p><span class="dot2"></span>Allowed: 1000</p>
  <p class="rejected"><span class="dot"></span>Rejected: 150</p>
  </div>


  <div>
  <h4>Gate 2</h4>  
  <p><span class="dot2"></span>Allowed: 800</p>
  <p class="rejected"><span class="dot"></span>Rejected: 250</p>
  </div>


  <div>
  <h4>Gate 3</h4>  
  <p><span class="dot2"></span>Allowed: 600</p>
  <p class="rejected"><span class="dot"></span>Rejected: 350</p>
  </div>

  <div>
  <h4>Gate 4</h4>  
  <p><span class="dot2"></span>Allowed: 45</p>
  <p class="rejected"><span class="dot"></span>Rejected: 65</p>
  </div>
</div>
</div>

</>
  )
}

export default Dashboard