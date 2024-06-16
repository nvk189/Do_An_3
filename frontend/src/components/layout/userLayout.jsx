import Header from '../header/headerUser';
import Footer from '../footer/footerUser';

// eslint-disable-next-line react/prop-types
const UserLayout = ({ children }) => {
  return (
    <div className=''>
        <Header />
        <div className="">{children}</div>
        <Footer />
    </div>
  )
}

export default UserLayout;