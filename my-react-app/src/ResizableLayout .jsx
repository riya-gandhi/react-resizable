import React, { useState, useEffect } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the styles for react-resizable
import axios from 'axios';

const ResizableLayout = () => {
    // Initialize data state for each component
    const [componentData, setComponentData] = useState({
        component1: { data: "component 1" },
        component2: { data: "component 2" },
        component3: { data: "component 3" }
    });

    // Function to handle the add button click
    const handleAddClick = async (componentName) => {
        try {
            const newData = { ...componentData[componentName], data: "New Data" };
            await axios.post('http://localhost:5000/api/add', { [componentName]: newData });
            setComponentData(prevState => ({
                ...prevState,
                [componentName]: newData
            }));
        } catch (error) {
            console.error('Error adding data:', error);
        }
    };

    // Function to handle the update button click
    const handleUpdateClick = async (componentName) => {
        try {
            const updatedData = { ...componentData[componentName], data: "Updated Data" };
            await axios.put('http://localhost:5000/api/update', { [componentName]: updatedData });
            setComponentData(prevState => ({
                ...prevState,
                [componentName]: updatedData
            }));
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/data');
                const initialData = response?.data?.[0];
                if (initialData) {
                    setComponentData(initialData);
                    console.log(componentData)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <div style={{ display: 'flex' }}>
                {/* First resizable component */}
                <ResizableBox style={{ border: '1px solid #ccc', margin: '10px' }} width={200} height={200} minConstraints={[100, 100]} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}>
                    <div>
                        <h2>Component 1</h2>
                        <p>Data: {componentData.component1.data}</p>
                        <div>
                            <button onClick={() => handleAddClick('component1')}>Add</button>
                            <button onClick={() => handleUpdateClick('component1')}>Update</button>
                        </div>
                    </div>
                </ResizableBox>

                {/* Second resizable component */}
                <ResizableBox style={{ border: '1px solid #ccc', margin: '10px' }} width={200} height={200} minConstraints={[100, 100]} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}>
                    <div>
                        <h2>Component 2</h2>
                        <p>Data: {componentData.component2.data}</p>
                        <div>
                            <button onClick={() => handleAddClick('component2')}>Add</button>
                            <button onClick={() => handleUpdateClick('component2')}>Update</button>
                        </div>
                    </div>
                </ResizableBox>
            </div>

            {/* Third resizable component */}
            <ResizableBox style={{ border: '1px solid #ccc', margin: '10px', flex: 1 }} width={200} height={200} minConstraints={[100, 100]} resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}>
                <div>
                    <h2>Component 3</h2>
                    <p>Data: {componentData.component3.data}</p>
                    <div>
                        <button onClick={() => handleAddClick('component3')}>Add</button>
                        <button onClick={() => handleUpdateClick('component3')}>Update</button>
                    </div>
                </div>
            </ResizableBox>
        </div>
    );
};

export default ResizableLayout;
