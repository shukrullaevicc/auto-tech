import { useSelector } from 'react-redux'
import { Avatar } from "antd";

const Profile = () => {
  const userInformation = useSelector(state => state.user)
  const user = JSON.parse(userInformation)

  return (
   <div className="flex justify-center items-center h-[100%]">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row w-full max-w-4xl">
      {/* Profile Card */}
         <div className="md:w-1/3 p-6 flex flex-col items-center bg-blue-100">
            <Avatar 
               size="large" 
               style={{ cursor: "pointer", color: "#f56a00", backgroundColor: "#fde3cf", marginBottom: "20px", width: "100px", height: "100px", fontSize: "50px", fontWeight: "bold", borderRadius: "50%" }}>
               {user?.first_name.at(0)}
            </Avatar>
            <h2 className="text-xl font-semibold text-gray-800">{user?.first_name}</h2>
            <p className="text-gray-600 mb-4">I am a {user?.role} in the account</p>
            <div className="flex justify-between w-full">
               <div className="flex flex-col items-center">
                  <span className="text-gray-600">{user?.likes ? user?.likes.length : 0}</span>
                  <span className="text-gray-600">Liked</span>
               </div>
               <div className="flex flex-col items-center">
                  <span className="text-gray-600">{user?.purchases ? user?.purchases.length : 0}</span>
                  <span className="text-gray-600">Purchased</span>
               </div>
            </div>
         </div>

         {/* Profile Details */}
         <div className="md:w-2/3 p-6">
            <div className="mb-4">
               <h3 className="text-gray-800 font-semibold">Name</h3>
               <p className="text-gray-600">{user?.first_name}</p>
            </div>
            <div className="mb-4">
               <h3 className="text-gray-800 font-semibold">User Name</h3>
               <p className="text-gray-600">{user?.username}</p>
            </div>
            <div className="mb-4">
               <h3 className="text-gray-800 font-semibold">Password</h3>
               <p className="text-gray-600">*********</p>
            </div>
            <div className="mb-4">
               <h3 className="text-gray-800 font-semibold">Phone Number</h3>
               <p className="text-gray-600">+998 90 123 45 67</p>
            </div>
         </div>
      </div>
   </div>
  )
}

export default Profile
