import { useState } from 'react'

const initialTasks = [
    { id: 1, title: 'Review Dr. Anil Certificate', assignee: 'Admin', priority: 'high', status: 'todo', due: '28 Feb' },
    { id: 2, title: 'Update OPD schedule for March', assignee: 'Dr. Meera', priority: 'medium', status: 'inprogress', due: '1 Mar' },
    { id: 3, title: 'Send appointment reminders', assignee: 'System', priority: 'low', status: 'done', due: '27 Feb' },
    { id: 4, title: 'Verify new doctor registration', assignee: 'Admin', priority: 'high', status: 'todo', due: '28 Feb' },
    { id: 5, title: 'Update fees for Cardiology', assignee: 'Admin', priority: 'medium', status: 'inprogress', due: '2 Mar' },
    { id: 6, title: 'Monthly billing report', assignee: 'Finance', priority: 'high', status: 'done', due: '26 Feb' },
]

const cols = [
    { key: 'todo', label: '📋 To Do', color: 'gray' },
    { key: 'inprogress', label: '⚡ In Progress', color: 'amber' },
    { key: 'done', label: '✅ Done', color: 'green' },
]

const priorityColor = {
    high: 'bg-red-100 text-red-600',
    medium: 'bg-amber-100 text-amber-600',
    low: 'bg-green-100 text-green-600',
}

const TaskManager = () => {
    const [tasks, setTasks] = useState(initialTasks)
    const [showAdd, setShowAdd] = useState(false)
    const [form, setForm] = useState({ title: '', assignee: '', priority: 'medium', status: 'todo', due: '' })
    const [dragging, setDragging] = useState(null)

    const handleAdd = (e) => {
        e.preventDefault()
        setTasks(prev => [...prev, { ...form, id: Date.now() }])
        setForm({ title: '', assignee: '', priority: 'medium', status: 'todo', due: '' })
        setShowAdd(false)
    }

    const moveTask = (id, newStatus) => {
        setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t))
    }

    const removeTask = (id) => setTasks(prev => prev.filter(t => t.id !== id))

    return (
        <div className='flex flex-col gap-6 animate-fade-up'>

            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Task Manager</h1>
                    <p className='text-gray-400 text-sm mt-0.5'>{tasks.filter(t => t.status !== 'done').length} tasks pending</p>
                </div>
                <button
                    onClick={() => setShowAdd(true)}
                    className='btn-glow bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-indigo-200'
                >
                    + New Task
                </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-3 gap-3'>
                {cols.map(({ key, label, color }) => (
                    <div key={key} className={`bg-${color}-50 border border-${color}-100 rounded-2xl p-3 text-center`}>
                        <p className={`text-xl font-bold text-${color}-700`}>{tasks.filter(t => t.status === key).length}</p>
                        <p className={`text-xs text-${color}-400 font-medium`}>{label}</p>
                    </div>
                ))}
            </div>

            {/* Kanban Board */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {cols.map(({ key, label, color }) => (
                    <div
                        key={key}
                        className={`bg-${color}-50 rounded-2xl p-4 min-h-[300px] border border-${color}-100`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => dragging && moveTask(dragging, key)}
                    >
                        <div className='flex items-center justify-between mb-3'>
                            <h3 className={`text-sm font-bold text-${color}-700`}>{label}</h3>
                            <span className={`w-6 h-6 rounded-full bg-${color}-200 text-${color}-700 text-xs font-bold flex items-center justify-center`}>
                                {tasks.filter(t => t.status === key).length}
                            </span>
                        </div>

                        <div className='flex flex-col gap-3'>
                            {tasks.filter(t => t.status === key).map((task) => (
                                <div
                                    key={task.id}
                                    draggable
                                    onDragStart={() => setDragging(task.id)}
                                    onDragEnd={() => setDragging(null)}
                                    className='bg-white rounded-xl p-3.5 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing animate-fade-up'
                                >
                                    <div className='flex items-start justify-between gap-2 mb-2'>
                                        <p className='text-sm font-semibold text-gray-900 leading-snug'>{task.title}</p>
                                        <button onClick={() => removeTask(task.id)} className='text-gray-300 hover:text-red-500 transition-colors text-xs flex-shrink-0'>✕</button>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-2'>
                                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${priorityColor[task.priority]}`}>
                                                {task.priority}
                                            </span>
                                            <span className='text-xs text-gray-400'>{task.assignee}</span>
                                        </div>
                                        <span className='text-xs text-gray-400'>📅 {task.due}</span>
                                    </div>

                                    {/* Move buttons */}
                                    <div className='flex gap-1 mt-2 pt-2 border-t border-gray-100'>
                                        {cols.filter(c => c.key !== key).map(c => (
                                            <button key={c.key} onClick={() => moveTask(task.id, c.key)}
                                                className='flex-1 text-xs text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 py-1 rounded-lg transition-all duration-200'>
                                                → {c.key === 'todo' ? 'Todo' : c.key === 'inprogress' ? 'Progress' : 'Done'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            {tasks.filter(t => t.status === key).length === 0 && (
                                <div className='text-center py-8 text-gray-300'>
                                    <p className='text-2xl mb-1'>📭</p>
                                    <p className='text-xs'>No tasks here</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Task Modal */}
            {showAdd && (
                <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
                    onClick={() => setShowAdd(false)}>
                    <div className='bg-white rounded-3xl shadow-2xl w-full max-w-md animate-fade-up'
                        onClick={(e) => e.stopPropagation()}>
                        <div className='p-5 border-b border-gray-100 flex items-center justify-between'>
                            <h2 className='font-bold text-gray-900'>Create New Task</h2>
                            <button onClick={() => setShowAdd(false)} className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-500 transition-all'>✕</button>
                        </div>
                        <form onSubmit={handleAdd} className='p-5 flex flex-col gap-4'>
                            {[
                                { label: 'Task Title', key: 'title', placeholder: 'e.g. Review doctor certificates', type: 'text' },
                                { label: 'Assignee', key: 'assignee', placeholder: 'e.g. Admin, Dr. Meera', type: 'text' },
                                { label: 'Due Date', key: 'due', placeholder: '28 Feb', type: 'text' },
                            ].map(({ label, key, placeholder, type }) => (
                                <div key={key}>
                                    <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1'>{label}</label>
                                    <input type={type} placeholder={placeholder} value={form[key]}
                                        onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))}
                                        className='w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm outline-none focus:border-indigo-400 transition-all duration-300'
                                        required />
                                </div>
                            ))}
                            <div className='grid grid-cols-2 gap-3'>
                                <div>
                                    <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1'>Priority</label>
                                    <select value={form.priority} onChange={(e) => setForm(p => ({ ...p, priority: e.target.value }))}
                                        className='w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm outline-none focus:border-indigo-400 transition-all duration-300'>
                                        <option value='low'>Low</option>
                                        <option value='medium'>Medium</option>
                                        <option value='high'>High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className='text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-1'>Status</label>
                                    <select value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}
                                        className='w-full px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-gray-50 text-sm outline-none focus:border-indigo-400 transition-all duration-300'>
                                        <option value='todo'>To Do</option>
                                        <option value='inprogress'>In Progress</option>
                                        <option value='done'>Done</option>
                                    </select>
                                </div>
                            </div>
                            <button type='submit' className='btn-glow w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold text-sm'>
                                ✅ Create Task
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TaskManager
