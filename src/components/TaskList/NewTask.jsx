import React from 'react'

const NewTask = ({ data, index, updateTaskStatus }) => {
    const acceptTask = () => {
        updateTaskStatus(index, {
            active: true,
            newTask: false,
            completed: false,
            failed: false,
        });
    };

    return (
        <div className="flex-shrink-0 h-full w-[300px] p-5 bg-blue-500 rounded-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-center">
                <h3 className="bg-gray-700 text-sm px-3 py-1 rounded">{data.category}</h3>
                <h4 className="text-sm">{data.taskDate}</h4>
            </div>
            <h2 className="mt-5 text-2xl font-semibold">{data.taskTitle}</h2>
            <p className="text-sm mt-2">
                {data.taskDescription}
            </p>
            <div className="mt-6">
                <button
                    onClick={acceptTask}
                    className=" w-full bg-emerald-800 rounded font-medium py-1 px-2 text-xs cursor-pointer hover:bg-emerald-900 transition-colors duration-200"
                >
                    Accept Task
                </button>
            </div>
        </div>

    )
}

export default NewTask