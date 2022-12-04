import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidV4 }from 'uuid';

function Task (props) {
    const { itemText, onDeleteItemHandler } = props;
    const [isItemChecked, setIsItemChecked] = useState(false);
  
    const onCheckboxChanged = () => {
      setIsItemChecked(!isItemChecked);
    }
    const checkboxStyle = isItemChecked ? { textDecoration: 'line-through' } : {}
  
    return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={checkboxStyle}>{itemText}</div>
      <input type="checkbox" onChange={onCheckboxChanged}></input>
      <button onClick={() => onDeleteItemHandler(itemText)}>Delete</button>
    </div>
    );
  }
  
export function TaskList(props) {
    const { inSync, user, onItemAddedCallback, preExistingUserTasks } = props;
  
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
  
    const onAddItemClicked = () => {
      const newTask = { user, title: input, id: uuidV4().toString() }

      onItemAddedCallback(newTask);
      setTasks([...tasks, newTask]);
      setInput('');
    }
  
    useEffect(() => { 
      if(!preExistingUserTasks) return; 
  
      setTasks([...tasks, ...preExistingUserTasks]);
    }, [preExistingUserTasks]);
  
    const onInputChangeMethod = (eventArgs) => {
      const currentInput = eventArgs.target.value;
      setInput(currentInput);
    }
  
    const onDeleteItem = (itemIndex) => {
      const toDoItemsDuplicate = [...tasks]
      toDoItemsDuplicate.splice(itemIndex, 1);
      setTasks(toDoItemsDuplicate);
    }
  
    const isEmptyToDoList = tasks.length === 0;
  
    return (<div>
      <h1>{user}'s ToDo List</h1>
      <h2 style={{color: inSync ? "green" : "orange"}}>{inSync ? "Connected" : "Is syncing..."}</h2>
      <input id="my-input" onChange={onInputChangeMethod} value={input} />
      <button onClick={onAddItemClicked}>Add Task</button>
      <div id="Items">
        {isEmptyToDoList ? <div>No Tasks</div> :
         tasks.map((item, index) => (
          <Task 
            key={index} 
            itemText={item.title} 
            onDeleteItemHandler={onDeleteItem} />
        ))}
      </div>
    </div>)
  }

export function TaskPage() {
  const params = useParams();
  console.log(params);

  const id = '';
  return (<div>Task {id}</div>);
}