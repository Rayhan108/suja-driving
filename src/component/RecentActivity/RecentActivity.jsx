import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useGetAllUserQuery } from "../../redux/feature/user/userApi";

const RecentActivity = () => {
  const searchTerm=""
  const page = 1
  const {data:allUsers}=useGetAllUserQuery({searchTerm,page})
  console.log("all user------>",allUsers);
  const users =allUsers?.data?.result
  return (
    <div className="bg-[#e6e6e6] text-black p-5 mt-3 font-title w-[30%]">
      <div>
        <h3 className="text-lg font-bold mb-3 ">Recent User</h3>
        
        {/* Activity Item 1 */}
        {
          users?.map((user,idx)=>{
    return <div className="activity-item flex justify-start items-center gap-2 mb-3" key={idx}>
          <div className="activity-icon">
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
          <div>
            <p className="activity-text">{user?.name}</p>
            {/* <span className="activity-time">20 min ago</span> */}
          </div>
        </div>
          }).slice(0,5)
        }
    


      </div>
    </div>
  );
};

export default RecentActivity;
