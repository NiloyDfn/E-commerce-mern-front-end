import { ReactElement, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "./TableHOc";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAlluserQuery, useDeleteUserMutation } from "../../redux/api/userAPI";
import { CustomeError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";
import { responseToast } from "../../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isError, error, data, isLoading } = useAlluserQuery(user?._id!);

  const [deleteUser] = useDeleteUserMutation()
  
  const [rows, setRows] = useState<DataType[]>([]);


  const deleteHandler = async (userId : string)  => {
    const res = await deleteUser({userId,adminUserId: user?._id!});
    responseToast(res,null,"");
  } ;

  if (isError) {
    const err = error as CustomeError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data)
      setRows(
        data.users.map((i) => ({
          avatar: <img style={{
            borderRadius : "50%",
          }} src={i.photo}
            alt={i.name}/>,
          name : i.name,
          email : i.email,
          gender : i.gender,
          role : i.role,
          action: i.role === 'admin' ? (
            <></>
          ) : (
            <button onClick={()=> deleteHandler(i._id)}>
              <FaTrash/>
            </button>
          ),
        }))
      );
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );
};

export default Customers;
