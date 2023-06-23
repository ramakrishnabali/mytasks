import {useState} from 'react'

import {v4} from 'uuid'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
const App = () => {
  const [task, setTask] = useState({
    task: '',
    tag: tagsList[0].displayText,
    taskList: [],
    activeId: '',
  })

  const getTask = event => {
    setTask(prevState => ({...prevState, task: event.target.value}))
  }

  const getTags = event => {
    setTask(prevState => ({...prevState, tag: event.target.value}))
  }

  const submitTask = event => {
    event.preventDefault()

    const newTask = {
      id: v4(),
      tasks: task.task,
      tag: task.tag,
    }
    // console.log(newTask)

    setTask(prevState => ({
      task: '',
      tag: '',
      taskList: [...prevState.taskList, newTask],
      activeId: '',
    }))
  }

  const getFilterList = id => {
    if (id !== task.activeId) {
      setTask(prevState => ({
        ...prevState,
        activeId: id,
      }))
    } else {
      setTask(prevState => ({
        ...prevState,
        activeId: '',
      }))
    }
  }

  const filteredList = task.taskList.filter(
    eachTask => eachTask.tag === task.activeId,
  )

  console.log(filteredList)

  return (
    <div className="app-container">
      <div className="left-container">
        <h1 className="main-heading">Create a task!</h1>
        <form className="form" onSubmit={submitTask}>
          <label htmlFor="task">Task</label>
          <input
            value={task.task}
            onChange={getTask}
            className="taskInput"
            id="task"
            type="text"
            placeholder="Enter the task here"
          />
          <label htmlFor="tags">Tags</label>
          <select
            value={task.tag}
            onChange={getTags}
            id="tags"
            className="taskInput"
          >
            {tagsList.map(eachTag => (
              <option key={eachTag.optionId} value={eachTag.displayText}>
                {eachTag.displayText}
              </option>
            ))}
          </select>
          <button className="add-button" type="submit">
            Add Task
          </button>
        </form>
      </div>
      <div className="right-container">
        <h1 className="tags-heading">Tags</h1>
        <ul className="list-container">
          {tagsList.map(each => {
            const {displayText} = each
            const getOptionId = () => {
              getFilterList(displayText)
            }
            return (
              <li key={each.optionId} className="list">
                <button
                  onClick={getOptionId}
                  type="button"
                  className="tags-button"
                >
                  {each.displayText}
                </button>
              </li>
            )
          })}
        </ul>
        <h1 className="tags-heading">Tasks</h1>
        <ul className="task-container">
          {filteredList.length === 0 ? (
            <h1 className="main-heading">No Tasks Added Yet</h1>
          ) : (
            filteredList.map(eachTask => {
              const {id, tasks, tag} = eachTask

              return (
                <li className="task" key={id}>
                  <p className="tags-heading">{tasks}</p>
                  <button className="add-button" type="button">
                    {tag}
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}

export default App
