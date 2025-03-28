import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "./TableHOc";
import { Skeleton } from "../../components/Loader";
import { useAllOrdersQuery } from "../../redux/api/orderApi";
import { CustomeError } from "../../types/api-types";
import { userReducerInitialState } from "../../types/reducer-types";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer);
  
  // Fetch orders
  const { isLoading, data, isError, error } = useAllOrdersQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (isError) {
      toast.error((error as CustomeError)?.data?.message || "An error occurred");
    }
  }, [isError, error]);

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          user: i.user ? i.user.name : "Unknown User", // ✅ Handle null user safely
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span className={i.status === "Processing" ? "red" : i.status === "Shipped" ? "green" : "purple"}>
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );
};

export default Transaction;
