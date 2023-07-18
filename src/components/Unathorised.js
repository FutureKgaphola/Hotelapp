
import NavBarUnathorised from "./NavBarUnathorised";
import Footer from "./footer";

const Unathorised = () => {
    var goHome=()=>{
        window.location.replace("/");
    }
    return (
        
        <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
            <NavBarUnathorised />

            <div class="row" style={{width:'100%',justifySelf:'center'}}>
                <div class="card-body">
                    <h5 class="card-title">Unathorised</h5>
                    <p class="card-text">You dont have permissions to visit this page or possible session expired. Click go home and try to login again.</p>
                    <button onClick={()=>goHome()} class="btn btn-success">Go Home</button>
                </div>
            </div>

            <Footer />
            
        </div>
    );
}

export default Unathorised;