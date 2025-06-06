import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { PRIORITY_DATA } from '../../utils/data'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import moment from 'moment'
import { LuTrash2 } from 'react-icons/lu'
import SelectDropDown from '../../components/Input/SelectDropDown'
import SelectUsers from '../../components/Input/SelectUsers'
import TodoListInput from '../../components/Input/TodoListInput'
import AddAttachmentsInput from '../../components/Input/AddAttachmentsInput'
import DeleteAlert from '../../components/DeleteAlert'
import Modal from '../../components/Modal'



const CreateTask = () => {

  const location = useLocation();
  const {taskId} = location.state || {}
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: '',
    description:'',
    priority:'Low',
    dueDate:'',
    assignedTo:[],
    todoChecklist:[],
    attachments:[],
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] =useState('');
  const[loading, setLoading] = useState(false);
  const[openDeleteAlert, setOpenDeleteALert] = useState(false);
  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({...prevData, [key]:value}));
  };

  const clearData = () => {
    setTaskData({
      title: '',
      description:'',
      priority:'Low',
      dueDate:null,
      assignedTo:[],
      todoChecklist:[],
      attachments:[],   
    });
  };

  //CREATE TASK
  const CreateTask = async() => {
    setLoading(true);
    try{
      const todolist = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));
      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todolist,
      });

      console.log(response);

      toast.success('Task Created Successfully');
      clearData();
    }catch(error) {
      toast.error("Failed to Create Task");
      console.error('Error creating task:', error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  //UPDATE TASK
  // const updateTask = async() => {
  //   setLoading(true);

  //   try{
  //     const todolist = taskData.todoChecklist?.map((item) => {
  //       const prevTodoChecklist = currentTask?.todoChecklist || [];
  //       const matchedTask = prevTodoChecklist.find((task) => task.text == item);

  //       return{
  //         text: item,
  //         completed:matchedTask ? matchedTask.completed : false,
  //       };
  //     });
  //     const response = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId),
  //     {
  //       ...taskData,
  //       dueDate: new Date(taskData.dueDate).toISOString(),
  //       todoChecklist: todolist,
  //     }
  //   );
  //     toast.success('Task Updated Successfully');
  //   }catch(error){
  //     console.error('Error creating task:', error);
  //     setLoading(false);
  //   }finally{
  //     setLoading(false);
  //   }
  // };

  // const handleSubmit = async() => {
  //   setError(null);

  //   //INPUT VALIDATION
  //   if (!taskData.title.trim()){
  //     setError('Please enter a title');
  //     return;
  //   }
  //   if (!taskData.description.trim()){
  //     setError('Please enter a description');
  //     return;
  //   }
  //   if (!taskData.dueDate){
  //     setError('Please enter a due date');
  //     return;
  //   }
  //   if (taskData.assignedTo?.length === 0){
  //     setError('Task is not assigned to any member');
  //     return;
  //   }
  //   if(taskData.todoChecklist?.length === 0){
  //     setError('Add atleast one todo task');
  //     return;
  //   }
  //   if (taskId){
  //     updateTask();
  //     return;
  //   }
  //   CreateTask();
  // };

//////////////////////////////////////////////////////////////////////////
const updateTask = async () => {
  setLoading(true);
  try {
    // Reconstruct todo checklist based on previous state
    const prevTodoChecklist = currentTask?.todoChecklist || [];
    const todolist = taskData.todoChecklist?.map((item) => {
      const matchedTask = prevTodoChecklist.find((task) => task.text === item);
      return {
        text: item,
        completed: matchedTask ? matchedTask.completed : false,
      };
    });

    await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
      ...taskData,
      dueDate: new Date(taskData.dueDate).toISOString(),
      todoChecklist: todolist,
    });

    toast.success('Task Updated Successfully');
  } catch (error) {
    console.error('Error updating task:', error);
    toast.error('Failed to update task'); // Add this for better UX
  } finally {
    setLoading(false);
  }
};


const handleSubmit = async () => {
  setError(null);

  // INPUT VALIDATION
 if (!taskData.title || !taskData.title.trim()) {
  setError('Please enter a title');
  return;
}
if (!taskData.description || !taskData.description.trim()) {
  setError('Please enter a description');
  return;
}

  if (!taskData.dueDate) {
    setError('Please enter a due date');
    return;
  }
  if (!taskData.assignedTo || taskData.assignedTo.length === 0) {
    setError('Task is not assigned to any member');
    return;
  }
  if (!taskData.todoChecklist || taskData.todoChecklist.length === 0) {
    setError('Add at least one todo task');
    return;
  }

  if (taskId) {
    await updateTask(); // Make sure to `await` to handle loading states properly
  } else {
    await CreateTask(); // Also await here
  }
};
///////////////////////////////////////////////////////////////////

  //GET TASK INFO BY ID
  const getTaskDetailsbyId = async() => {
    try{
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
    );
    if (response.data){
      const taskInfo = response.data;
      setCurrentTask(taskInfo);

      setTaskData((prevState) => ({
        title: taskInfo.title,
        description:taskInfo.description,
        priority:taskInfo.priority,
        dueDate:taskInfo.dueDate
          ? moment(taskInfo.dueDate).format('YYYY-MM-DD')
          : '',
        assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
        todoChecklist:
          taskInfo?.todoChecklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
      }))
    }
    }catch(error){
        console.log('Error fetching users', error);   
    }
  };  

  //DELETE TASK
  const deleteTask = async() => {
    try{
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

      setOpenDeleteALert(false);
      toast.success("Deleted successfully");
      navigate('/admin/tasks')
    }catch(error){
      console.error('Error deleting expense', error.respond?.data?.message || error.message)
    }
  };

  useEffect(() => {
    if(taskId) {
      getTaskDetailsbyId(taskId)
    }

      return() => {
        
      }
  }, [taskId])

  return (
    <DashboardLayout activeMenu='Create Tasks'>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? 'Update Task' : 'Create Task'}
              </h2>
              {taskId && (
                <button className='flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-2 border-rose-200 hover:border-rose-400 cursor-pointer' onClick={() => setOpenDeleteALert(true)}>
                  <LuTrash2 className='ttext-base' /> Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <label className="textt-xs font-medium text-slate-600">
                Task Title
              </label>
              <input 
                placeholder='Create App UI'
                className='form-input'
                value={taskData.title}
                onChange={({target}) => 
                  handleValueChange('title',target.value)
                }              
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>
              <textarea
                placeholder='Descripion Task'
                className='form-input'
                rows={4}
                value={taskData.description}
                onChange={({target}) => 
                  handleValueChange('description', target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="cols-span-6 md:col-span-4">
                <label  className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropDown
                options={ PRIORITY_DATA }
                value={taskData.priority}
                onChange={(value) => handleValueChange('priority', value)}
                placeholder='Select Priority'                
                />              
              </div>

              <div className="col-span-6 md:col-span-4">
                <label className='form-input'>
                  Due Date
                </label>
                <input
                  placeholder='Create App UI'
                  className='form-input'
                  value={taskData.dueDate}
                  onChange={({target}) =>
                    handleValueChange('dueDate', target.value)
                  }
                  type='date'
                />
              </div>
              <div className="col-span-10 md:col-span-3">
                <label className="text-xs font-medium text-slate-700">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange('assignedTo', value)
                  }}
                
                />
              </div>
            </div>

            <div className="mt-3">
                  <label className='text-xs font-medium text-slate-600'>
                    ToDo Checklist
                  </label>
                  <TodoListInput
                    todolist={taskData?.todoChecklist}
                    setTodoList={(value) => 
                      handleValueChange('todoChecklist', value)
                    }
                  />
            </div>
            <div className="mt-3">
              <label  className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
                  
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) => 
                  handleValueChange('attachments', value)
                }
              />
            </div>
            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}
            <div className="flex justify-end mt-7">
              <button
                className='add-btn'
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? 'UPDATE TASK' : 'CREATE TASK'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteALert(false)}
        title='Delete Task'
      >
        <DeleteAlert
          content='Are you sure you want to delete this task?'
          onDelete={() => deleteTask()}
        />      
      </Modal>      



    </DashboardLayout>
  )
}

export default CreateTask