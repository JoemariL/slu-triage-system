import Header from '../app/components/sidenav';
// import "../body.css"
import "../findQR.css"

function FindQR() {
  return (<>

    <Header/>
    
    
    <div class="container3">
    <div>
    <h1 name="dashboardh1">Find QR</h1>
    </div>
    <table>
  <tr>
    <th>Campus</th>
    <th>Gate</th>
    <th>QR</th>
  </tr>
  <tr>
    <td>Main</td>
    <td>1</td>
    <td>image file</td>
  </tr>
    <tr>
    <td>Bakakeng</td>
    <td>2</td>
    <td>image file</td>
  </tr>
</table>
    </div>
    
    
    </>
  )
}

export default FindQR