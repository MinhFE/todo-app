import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Button, Stack, Tab, Tabs, TextField } from '@mui/material';
import CustomTabPanel from './components/CustomTabPanel';
import TodoItem from './components/TodoItem';
import { ETabs, TodoItemProps } from './types';

function a11yProps(index: ETabs) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const baseUrl = 'http://localhost:3001';

function App() {
  const [currentTab, setCurrentTab] = useState(ETabs.All);
  const rootData = useRef<TodoItemProps[]>([]);
  const [tasks, setTasks] = useState<TodoItemProps[] | undefined>([]);
  const [name, setName] = useState<string>('');
  const [isErrorEmpty, setIsErrorEmpty] = useState<boolean>(false);

  const handleFilterDataByTab = useCallback(
    (data: any[]) => {
      if (currentTab === ETabs.Incomplete) {
        return data.filter(item => item.isCompleted === false);
      } else if (currentTab === ETabs.Completed) {
        return data.filter(item => item.isCompleted === true);
      }
      return data;
    },
    [currentTab]
  );

  const initialData = useCallback(async () => {
    try {
      const response = await fetch(`${baseUrl}/tasks`);
      const result = await response.json();
      rootData.current = result;
      return handleFilterDataByTab(result);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }, [handleFilterDataByTab]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await initialData();
      setTasks(data);
    };
    fetchData();
  }, [initialData]);

  useEffect(() => {
    setTasks(handleFilterDataByTab(rootData.current));
  }, [currentTab, handleFilterDataByTab]);

  const handleChange = (_event: React.SyntheticEvent, newValue: any) => {
    setCurrentTab(newValue);
  };

  const handleAddTask = async () => {
    if (name.trim() === '') {
      setIsErrorEmpty(true);
      return;
    }

    await fetch(`${baseUrl}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: crypto.randomUUID,
        name: name,
        isCompleted: false,
      }),
    })
      .then(response => response.json())
      .then(() => {
        setName('');
      })
      .catch(error => console.error('Error:', error));
    const data = await initialData();
    setTasks(data);
  };

  return (
    <div className="App">
      <div className="app_container">
        <div className="container_title">Todo App</div>

        <Stack direction={'row'} spacing={1} marginTop={3} marginBottom={3}>
          <TextField
            error={isErrorEmpty}
            id="outlined-error-helper-text"
            placeholder="Enter todo name..."
            fullWidth
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (isErrorEmpty) {
                setIsErrorEmpty(false);
              }
            }}
            helperText={isErrorEmpty ? 'Todo name cannot be empty' : ''}
          />
          <Button
            variant="contained"
            style={{
              maxHeight: '56px',
            }}
            onClick={handleAddTask}
          >
            Add
          </Button>
        </Stack>

        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="All" {...a11yProps(ETabs.All)} />
          <Tab label="Incomplete" {...a11yProps(ETabs.Incomplete)} />
          <Tab label="Completed" {...a11yProps(ETabs.Completed)} />
        </Tabs>
        <CustomTabPanel value={currentTab} index={ETabs.All}>
          {tasks?.map(item => (
            <TodoItem
              isCompleted={item.isCompleted}
              name={item.name}
              key={item.id}
            />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={ETabs.Incomplete}>
          {tasks?.map(item => (
            <TodoItem
              isCompleted={item.isCompleted}
              name={item.name}
              key={item.id}
            />
          ))}
        </CustomTabPanel>
        <CustomTabPanel value={currentTab} index={ETabs.Completed}>
          {tasks?.map(item => (
            <TodoItem
              isCompleted={item.isCompleted}
              name={item.name}
              key={item.id}
            />
          ))}
        </CustomTabPanel>
      </div>
    </div>
  );
}

export default App;
