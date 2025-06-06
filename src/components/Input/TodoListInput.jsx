import React, { useState } from 'react'
import {HiMiniPlus, HiOutlineTrash} from 'react-icons/hi2'

const TodoListInput = ({todolist, setTodoList}) => {
    const [option, setOption] = useState('');

    //FUNCTION TO HANDLE ADDING AN OPTION
    const handleAddOption = () => {
        if(option.trim()){
            setTodoList([...todolist, option.trim()]);
            setOption('');
        }
    };

    //FUNCTION TO HANDLE DELETING AN OPTION
    const handleDeleteOption = (index) => {
        const updatedArr = todolist.filter((_, idx) => idx !== index)
        setTodoList(updatedArr);
    }
  return (
    <div>
        {todolist.map((item, index) => (
            //////////////////////////////////////
            <div className="flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2" key={`${item}-${index}`}>
                <p className="text-xs text-black">
                    <span className="text-xs text-gray-400 font font-semibold mr-2">
                        {index < 9 ? `0${index+1}` : index + 1}
                    </span>
                    {item}
                </p>

                <button 
                className='cursor-pointer' 
                onClick={() => {
                    handleDeleteOption(index);
                }}>
                    <HiOutlineTrash className='' />
                </button>
            </div>
        ))}
        <div className="flex items-center gap-5 mt-4">
            <input 
            type="text" 
            placeholder='Enter Task'
            value={option}
            onChange={({target}) => setOption(target.value)}
            className="w-full text-[13px] text-black outline-none bg-white border border-gray-100 px-3 py-2 rounded-md"
            />
            <button className='card-btn text-nowrap' onClick={handleAddOption}>
                <HiMiniPlus className='text-lg' /> Add
            </button>
        </div>
    </div>
  )
}

export default TodoListInput