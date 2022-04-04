import "../body.css"
import Header from '../app/components/Header';

function Dashboard() {
  return (<>

 <Header /> 
<div>
<h1>Navy Base</h1>
</div>


<div class="flex-container">
  <div>
  <h4>Gate 1</h4>  
  <p><span class="dot2"></span>Allowed: 25</p>
  <p><span class="dot"></span>Rejected: 65</p>
  </div>


  <div>
  <h4>Gate 2</h4>  
  <p><span class="dot2"></span>Allowed: 25</p>
  <p><span class="dot"></span>Rejected: 65</p>
  </div>


  <div>
  <h4>Gate 3</h4>  
  <p><span class="dot2"></span>Allowed: 25</p>
  <p><span class="dot"></span>Rejected: 65</p>
  </div>

  <div>
  <h4>Gate 4</h4>  
  <p><span class="dot2"></span>Allowed: 25</p>
  <p><span class="dot"></span>Rejected: 65</p>
  </div>
</div>

</>
  )
}

export default Dashboard