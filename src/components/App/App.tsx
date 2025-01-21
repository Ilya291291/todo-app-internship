import './App.css'
import React,{useState, useEffect} from "react"
import {v4 as uuidv4} from 'uuid'
import Task from '../Task/Task'
import TO_DO_APP_MOCKS from '../../TO_DO_APP_MOCKS'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import FilterButton from '../FilterButton/FilterButton'

import { ITask } from '../../types/ITask';

const App = () => {

  const [value, setValue] = useState<string>("")
  const [tasks, setTasks] = useState<ITask[]>(localStorage.getItem("tasks") ? 
  JSON.parse(localStorage.getItem("tasks")!) : TO_DO_APP_MOCKS)
  const [filter, setFilter] = useState<string>("Все")

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  const FILTER_MAP : Record<string, (task: ITask) => boolean> = {
    Все: () => true,
    Завершенные: (task: ITask) => !task.isCompleted,
    Незавершенные: (task: ITask) => task.isCompleted,
  }
  const FILTER_NAMES = Object.keys(FILTER_MAP)

  const filterList = FILTER_NAMES.map((name)=> (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  function handleChange(e: React.ChangeEvent<HTMLInputElement> ) : void {
    const v = e.target.value as string
    setValue(v)
  }
  function createTask() {
    if(value.length > 2) {
      const task = {
        id: uuidv4(),
        text: value,
        isCompleted: false
      }  
      setTasks(prev => [...prev, task])
      setValue("")
    }
  }

  function completeTask(taskId : string) {
    const updatedTasks: ITask[] = tasks.map(task => {
      if(taskId === task.id) {
        return {...task, isCompleted : !task.isCompleted}
      }
      return task
    })
    const sortedTasks: ITask[] = updatedTasks.sort((x,y) => x.isCompleted === y.isCompleted ? 0 : x.isCompleted ? -1 : 1)
    setTasks(sortedTasks)
  }

  function deleteTask(taskId : string) {
    setTasks(oldTasks => oldTasks.filter(task => task.id !== taskId))
  }
  const allTasks = 
  tasks.filter(FILTER_MAP[filter])
  .map(task => (
    (
    <Task
      key={task.id}
      task={task}
      completeTask={completeTask}
      deleteTask={deleteTask}
    />
    )))
  return (
    <div className="App">
      <div className="notes">
        <Header />
        <div className="task-inputs">
          <div className="btn-wrapper">
            {filterList}
          </div>
          <input 
            type="text" 
            placeholder="Здесь можно создать список дел"
            onChange={handleChange}
            value={value}
            className="task-input"
          >
          </input>
          <button className="new-note" onClick={createTask}>+</button>
        </div>
        <ul className="tasks-list">
          {tasks.length > 0 ? allTasks : ''}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default App;
