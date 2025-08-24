import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useGetAllUserQuery } from "../../redux/feature/user/userApi";

const RecentActivity = () => {
  const searchTerm=""
  const page = 1
  const {data:allUsers}=useGetAllUserQuery({searchTerm,page})
  console.log("all user------>",allUsers);
  return (
    <div className="bg-[#e6e6e6] text-black p-5 mt-3 font-title w-[30%]">
      <div>
        <h3 className="text-lg font-bold mb-3 ">Recent User</h3>
        
        {/* Activity Item 1 */}
        <div className="activity-item flex justify-start items-center gap-2 mb-3">
          <div className="activity-icon">
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
          <div>
            <p className="activity-text">Israa Completed a Hazard Test</p>
            <span className="activity-time">20 min ago</span>
          </div>
        </div>
        
        {/* Activity Item 2 */}
        <div className="activity-item flex justify-start items-center gap-2 mb-3">
          <div className="activity-icon">
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
          <div>
            <p className="activity-text">Israa Completed a Hazard Test</p>
            <span className="activity-time">20 min ago</span>
          </div>
        </div>
        
        {/* Activity Item 3 */}
        <div className="activity-item flex justify-start items-center gap-2 mb-3">
          <div className="activity-icon">
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
          <div>
            <p className="activity-text">Israa Completed a Hazard Test</p>
            <span className="activity-time">20 min ago</span>
          </div>
        </div>
        
        {/* Activity Item 4 */}
        <div className="activity-item flex justify-start items-center gap-2 mb-3">
          <div className="activity-icon">
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
          <div>
            <p className="activity-text">Israa Completed a Hazard Test</p>
            <span className="activity-time">20 min ago</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecentActivity;
