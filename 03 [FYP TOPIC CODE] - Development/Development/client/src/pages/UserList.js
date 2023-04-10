import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar } from "antd";
import DataTable from "react-data-table-component";
import Sidebar from "../components/nav/sidebar";
import { useNavigate } from "react-router-dom";
import {format} from 'timeago.js';




export default function UserList() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/users");
      const usersWithAdCount = await Promise.all(
        data.map(async (user) => {
          const { data: adData } = await axios.get(`/user-ad-count/${user._id}`);
          const adCount = adData.length;
          return { ...user, adCount };
        })
      );
      setUsers(usersWithAdCount);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
 
  
  

  const columns = [
    {
      name: "S.N.",
      selector: "id",
      sortable: true,
      width: "75px",
      sortFunction: (a, b) => parseInt(a.id) - parseInt(b.id),
      cell: (row, index) => <div>{index + 1}</div>
    },
  
  {
    name: "Profile",
    selector: (row) => row.photo?.Location,
    sortable: true,
    width: "85px",
    cell: (row) => (
      <>
        {row?.photo?.Location ? (
          <Avatar
            src={row.photo?.Location}
            shape="circle"
            size={32}
           
          />
        ) : (
          <Avatar
            src={
              "https://cdn-icons-png.flaticon.com/512/138/138661.png?w=1380&t=st=1680618337~exp=1680618937~hmac=eb0368c1c6baec28a7dbc858173b6eb382e47822a432fdf5332c04e499cb3f70"
            }
            shape="circle"
            size={32}
         
          />
        )}
      </>
    ),
  },
  
  {
    name: "Full Name",
    selector: (row) => `${row.firstname} ${row.lastname}`,
    sortable: true,
    cell: (row) => <div className="sm">{row.firstname} {row.lastname}</div>
  },
    {
      name: "Phone",
      selector: (row) => row.phone,
    
      sortable: true,
      cell: (row) => <div className="sm">{row.phone}</div>
    },
    {
      name: "Ads",
      selector: (row) => row.adCount,
      sortable: true,
      width: "80px",
      cell: (row) => <div className="sm">{row.adCount}</div>,
    },
    
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      cell: (row) => <div className="sm">{row.email}</div>
    },
    {
      name: "Joined",
      selector: (row) => row.createdAt,
      sortable: true,
      cell: (row) => <div className="sm">{`${format(row.createdAt)}`}</div>
  
    },
    {
      name: "Status",
      selector: (row) => row.isReported,
      sortable: true,
      cell: (row) => (
        <>
          {row.isReported ? (
            <span className="text-danger">Reported</span>
          ) : (
            <span className="text-success">Okay</span>
          )}
        </>
      ),
    },
    {
      name: "Action",
      sortable: false,
      cell: (row) => (
        <div className="">
     
        <button className={`${row.isBanned ? "btn btn-primary" : "btn btn-danger"}`} onClick={() => handleBan(row)}>
          {row.isBanned ? "Unblock" : "Block"}
        </button>

        {row.isReported && !row.isBanned ? ( <button className="btn btn-primary" onClick={()=>handleUnReport(row)}>Examined</button>):''}
       

        </div>
      )
    }
  ];
  

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleRowClick = (row) => {
    navigate(`/user/${row.username}`);
  };
  

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBan = async (row) => {
    try {
      await axios.put(`/banuser/${row._id}`);
      const updatedUsers = users.map((user) => {
        if (user._id === row._id) {
          return { ...user, isBanned: !user.isBanned };
        }
        return user;
      });
      setUsers(updatedUsers);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUnReport= async (row) => {
    try {
      await axios.put(`/examine/${row._id}`);
      const updatedUsers = users.map((user) =>{
        if (user._id === row._id) {
          return { ...user, isReported: false };
        }
        return user;
      })
      setUsers(updatedUsers);
      
    } catch (error) {
      console.error();
      
    }
  }

  return (
    <div className="container-fluid">
        <div className="row">
            
            <div className ="col-3 col-lg-2  p-0 justify-content-center"> <div><Sidebar /></div></div>
            
                <div className ="col-9 col-lg-10">
                  <div className="container">
                  <div className="row"></div>
                    <div className="col-10 mt-5 ">
                            <h1 className="adH1">MyRoom User List</h1>
                            <p className="w-75 adP"> All new Conversation starts from the top. </p>
                        </div>
                    <div className="mb-3">
                      <input className="sm"
                        type="text"
                        placeholder="Search for a user..."
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </div>
                  
                    <DataTable
                      columns={columns}
                      data={filteredUsers}
                      progressPending={loading}
                      pagination
                      paginationPerPage={10}
                      paginationRowsPerPageOptions={[10, 20, 30]}
                      noHeader
                      pointerOnHover
                      highlightOnHover
                      onRowClicked={handleRowClick}
                      style={{ maxWidth: "100%", overflowX: "auto" }}
                    />
                  </div>

                    
                  </div>
                </div>
              </div>

        // {/* <pre>{JSON.stringify(auth.user, null, 2)}</pre> */}

   
  );
};