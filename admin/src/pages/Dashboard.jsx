import "../body.css"
import Header from '../app/components/Header';

function Dashboard() {
  return (<>

<Header/>

<div>
<h1>Mary Heights Campus</h1>
</div>

<div class="flex-container">
  <div>
  <h4>Gate 1</h4>  
  <p><span class="dot2"></span>Allowed: 1000</p>
  <p><span class="dot"></span>Rejected: 150</p>
  </div>


  <div>
  <h4>Gate 2</h4>  
  <p><span class="dot2"></span>Allowed: 800</p>
  <p><span class="dot"></span>Rejected: 250</p>
  </div>


  <div>
  <h4>Gate 3</h4>  
  <p><span class="dot2"></span>Allowed: 600</p>
  <p><span class="dot"></span>Rejected: 350</p>
  </div>

  <div>
  <h4>Gate 4</h4>  
  <p><span class="dot2"></span>Allowed: 45</p>
  <p><span class="dot"></span>Rejected: 65</p>
  </div>
</div>

</>
  )
}

export default Dashboard