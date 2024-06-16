import Header from '../header/headerAdmin';
import Slibar from '../slibar/slibarAdmin';
// import Footer from '../footer/footerAdmin';

const adminLayout = ({ children }) => {
  
  return (
    <div className=' ' id='wrapper'>
   
        <Slibar />
        <div className="d-flex flex-column  " id='content-wrapper'>
            <div className="" id='content'>
               
                <Header />
                 <div className="">{children}</div>

                {/* <Footer /> */}
            </div>
        </div>
    </div>
    // <div className="" id="wrapper">
    //   <Header />
    //   <Slibar/>
    //   <div className="">{children}</div>
    // </div>
    
  )
}

export default adminLayout;



