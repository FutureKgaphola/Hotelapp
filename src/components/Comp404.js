
import NavBar from "./Navbar";
import Footer from "./footer";
import LoginDialog from "./LoginDialog";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import img404 from '../media/notfound.png';
import { Link } from "react-router-dom";

const Comp404 = () => {
    return ( 
      <div className="container" style={{ backgroundColor: 'white', height: '100%' }}>
      <NavBar />


      <div className="row" style={{ margin: '5px', padding: '0', borderRadius: "0px 5px 5px 0px", backgroundColor: '#306832' }}>
          <div className="col" style={{ margin: '15% 0px 5px 5px',textAlign:"center" }}>
            <Link to={'/'} class="btn btn-light">{"<- Go Back Home"}</Link>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12">
          <LazyLoadImage
              placeholderSrc={img404}
              effect='blur'
              style={{ width: '100%', objectFit: 'cover', height: "100%", borderRadius: "0px 5px 5px 0px",backgroundColor:'white',marginLeft:'5px' }}
              alt={'Room_image'}
              height={"100%"}
              src={img404} 
              width={"100%"} />
          </div>

      </div>

      <Footer />
      <LoginDialog />
  </div>
     );
}
 
export default Comp404;