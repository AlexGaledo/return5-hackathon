import FB from '../assets/FB.png';
import LinkedIN from '../assets/LinkedIN.png';
import Youtube from '../assets/Youtube.png';
import Instagram from '../assets/Instagram.png';


export const Footer = () =>{
  return(
    <>
    <div className="footer">
      <div className="footer-left">
        <div className="footer-project">BayaniHub</div>
        <div className="footer-icons">
          <img src={FB} className='IconPNG'/>
          <img src={LinkedIN} className='IconPNG'/>
          <img src={Youtube} className='IconPNG'/>
          <img src={Instagram} className='IconPNG'/>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-right1">
          <p className="footer-text1">About Us</p>
          <p className="footer-text2">FAQS</p>
          <p className="footer-text2">How it Works</p>
          <p className="footer-text2">Terms & Privacy</p>
        </div>
        <div className="footer-right2">
          <p className="footer-text1">Contact Us</p>
          <p className="footer-text2">Report a Problem</p>
          <p className="footer-text2">Newsletter Signup</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Footer;