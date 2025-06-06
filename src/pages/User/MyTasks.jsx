// import React, { useEffect, useState } from 'react'
// import DashboardLayout from '../../components/layouts/DashboardLayout'
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../utils/axiosInstance';
// import { API_PATHS } from '../../utils/apiPaths';
// import { LuFileSpreadsheet } from 'react-icons/lu';
// import TaskStatusTabs from '../../components/TaskStatusTabs';
// import TaskCard from '../../components/Cards/TaskCard';

// const MyTasks = () => {

//   const [allTasks, setAllTasks] = useState([]);
//   const [ tabs, setTabs] = useState([]);
//   const [filterStatus, setFilterStatus] = useState('All');

//   const navigate = useNavigate();

//   const getAllTasks = async () => {
//     try{
//       const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS,{
//         params: {
//           status: filterStatus === 'All' ? '' : filterStatus,
//         },
//       });
//       setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks: []);

//       // MAP statusSummary data with fixed labels and order
//       const statusSummary = response.data?.statusSummary || {}
//       const statusArray = [
//         { label: 'All', count: statusSummary.all || 0 },
//         {label: 'pending', count: statusSummary.pendingTasks || 0},
//         {label: 'progress', count: statusSummary.inProgress || 0},
//         {label: 'completed', count: statusSummary.done || 0},
//       ];
//       setTabs(statusArray);

//     }catch(error){
//       console.error('Error fetching users:', error);
//     }
//   };

//   const handleClick = (taskId) => {
//     navigate(`/user/task-details/${taskId}`)
//   };



//   useEffect(() => {
//     getAllTasks(filterStatus);
//     return () => {};
//   }, [filterStatus]);



//   return (
//     <DashboardLayout activeMenu='My Tasks'>
//       <div className="my-5">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between">
//             <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>
            
            
          

//         {tabs?.[0]?.count > 0 && (
         
//             <TaskStatusTabs
//               tabs={tabs}
//               activeTab={filterStatus}
//               setActiveTab={setFilterStatus}
//             />
          
          
//         )}

//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//           {allTasks?.map((item, index) => (
//             <TaskCard
//               key={item._id}
//               title={item.title}
//               description={item.description}
//               priority={item.priority}
//               status={item.status}
//               progress={item.progress}
//               createdAt={item.createdAt}
//               dueDate={item.dueDate}
//               assignedTo = {item.assignedTo?.map((item) => item.profileImageUrl)}
//               attachmentCount={item.attachments?.length || 0}
//               completedTodoCount={item.completedTodoCount || 0}
//               todoChecklist={item.todoChecklist || []}
//               onClick={() => {
//                 handleClick(item._id);
//               }}

//             />
//           ))}
//         </div>
//       </div>
//     </DashboardLayout>
//   )
// }

// export default MyTasks



import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import TaskStatusTabs from '../../components/TaskStatusTabs';
import TaskCard from '../../components/Cards/TaskCard';

const MyTasks = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === 'all' ? '' : filterStatus,
        },
      });
      console.log(response.data);

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      // Build tabs array with label and value
      const statusSummary = response.data?.statusSummary || {};
      setTabs([
        { label: 'All', value: 'all', count: statusSummary.all || 0 },
        { label: 'Pending', value: 'pending', count: statusSummary.pendingTasks || 0 },
        { label: 'Progress', value: 'in-progress', count: statusSummary.inProgressTasks || 0 },
        { label: 'Completed', value: 'completed', count: statusSummary.completedTasks || 0 },
      ]);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setAllTasks([]);
      setTabs([
        { label: 'All', value: 'all', count: 0 },
        { label: 'Pending', value: 'pending', count: 0 },
        { label: 'Progress', value: 'in-progress', count: 0 },
        { label: 'Completed', value: 'completed', count: 0 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (taskId) => {
    navigate(`/user/task-details/${taskId}`);
  };

  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu='My Tasks'>
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>
          {tabs.length > 0 && (
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />
          )}
        </div>
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading tasks...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {allTasks.length > 0 ? allTasks.map((item) => (
              <TaskCard
                key={item._id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                progress={item.progress}
                createdAt={item.createdAt}
                dueDate={item.dueDate}
                assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
                attachmentCount={item.attachments?.length || 0}
                completedTodoCount={item.completedTodoCount || 0}
                todoChecklist={item.todoChecklist || []}
                onClick={() => handleClick(item._id)}
              />
            )) : (
              <div className="col-span-full text-center text-gray-400 py-10">
                No tasks found.
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTasks;
