import { MdError } from "react-icons/md"
import { Link } from "react-router-dom"

const Notfound = () => {
  return (
    <div className="notfound">
      <h1>Page Not Found 404 <MdError/></h1>
      <Link to={"/"}>  click here to go back to <span>Home</span> </Link>
    </div>
  )
}

export default Notfound