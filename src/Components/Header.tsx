import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { cartReducerInitialState } from "../types/reducer-types";

  

interface PropsType {
  user : User | null ;
}

const Header = ({user}:PropsType) => {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const {cartItems} = useSelector((state:{cartReducer:cartReducerInitialState}) => state.cartReducer)
    
    const logoutHandler = async()=> {
        try {
          await signOut(auth)
          toast.success("sign out successfully")
          setIsOpen(false)
        } catch (error) {
          toast.error("sign out failed")
        }
    };


  return (
    <nav className="header">
       <div><Link className="linktag" onClick={()=> setIsOpen(false)} to="/admin/dashboard" >Admin</Link></div>
       <Link onClick={()=> setIsOpen(false)} to={"/"}>Home</Link> 
       <Link onClick={()=> setIsOpen(false)} to={"/search"}><FaSearch/> </Link> 
       <Link onClick={()=> setIsOpen(false)} to={"/cart"}><FaShoppingBag/> {cartItems.length}</Link> 
        {
            user?._id? (
              <>
              <button onClick={()=>setIsOpen((prev) => !prev)}>
                <FaUser/>
              </button>
              <dialog open={isOpen}>
                <div>
                    {user.role ==="admin" && (
                        <Link onClick={()=> setIsOpen(false)} to="/admin/dashboard" >Admin</Link>
                    )}
                <Link className="link" onClick={()=> setIsOpen(false)} to="/orders">Orders</Link>   
                 <button onClick={logoutHandler}>
                    <FaSignOutAlt/>
                 </button>
                </div>
              </dialog>
              </>  
            ): <Link to={"/login"}>
               <button style={{ backgroundColor: 'blue', color: 'white', padding: '6px 12px', border: 'none', borderRadius: '20px', cursor: 'pointer' }}>Sign-UP</button>
            </Link>
        }
    </nav>
  )
}

export default Header