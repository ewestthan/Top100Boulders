import { Button, Form, Input, Popconfirm, Table, Checkbox, InputNumber, Typography  } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MenuOutlined, CheckCircleFilled, CloseCircleOutlined} from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const Row = ({ children, ...props }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });
  const style = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      },
    )?.replace(/translate3d\(([^,]+),/, 'translate3d(0,'),
    transition,
    ...(isDragging
      ? {
          position: 'relative',
          zIndex: 9999,
        }
      : {}),
  };
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (child.key === 'sort') {
          return React.cloneElement(child, {
            children: (
              <MenuOutlined
                ref={setActivatorNodeRef}
                style={{
                  touchAction: 'none',
                  cursor: 'move',
                }}
                {...listeners}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'boolean' ? <Checkbox defaultChecked={record[dataIndex]}/> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (

        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const MainTable = () => {

  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      rank: '1',
      grade: 'V13',
      name: 'Kintsugi',
      location: "Red Rocks",
      uncontrived: true,
      obviousStart: true,
      greatRock: true,
      flatLanding: true,
      tall: true,
      beautifulSetting: true,
      sent: true,
    },
    {
      key: '2',
      rank: '2',
      grade: 'V11',
      name: 'Western Gold',
      location: "Southeast",
      uncontrived: false,
      obviousStart: false,
      greatRock: false,
      flatLanding: false,
      tall: false,
      beautifulSetting: false,
      sent: false,
    },
    {
      key: '3',
      rank: '3',
      grade: 'V10',
      name: 'King Air',
      location: "Yosemite",
      uncontrived: true,
      obviousStart: true,
      greatRock: true,
      flatLanding: true,
      tall: true,
      beautifulSetting: true,
      sent: true,
    }
  ]);

  
  const defaultColumns = [
    {
      key: 'sort'
    },
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      editable: true,
    },
    {
      title: 'Uncontrived',
      dataIndex: 'uncontrived',
      key: 'uncontrived',
      editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Obvious Start',
      dataIndex: 'obviousStart',
      key: 'obviousStart',
      editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Great Rock',
      dataIndex: 'greatRock',
      key: 'greatRock',
      editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Flat Landing',
      dataIndex: 'flatLanding',
      key: 'flatLanding',
      editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Tall',
      dataIndex: 'tall',
      key: 'tall',
      editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Beautiful Setting',
      dataIndex: 'beautifulSetting',
      key: 'beautifulSetting',
      editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,

    },
    {
      title: 'Sent',
      dataIndex: 'sent',
      key: 'sent',
      editable: true,
      inputType: 'boolean',
      render : (_, text) => {
        return text.sent ? (<CheckCircleFilled />) : (<CloseCircleOutlined />)
      },
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => handleSave(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={handleCancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link disabled={editingKey !== ''} onClick={() => handleEdit(record)}>
              Edit
            </Typography.Link>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
              <a> Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const [count, setCount] = useState(2);


  const handleEdit = (record) => {
    form.setFieldsValue({
      rank: '',
      grade: 'V',
      name: '',
      location: "",
      uncontrived: false,
      obviousStart: false,
      greatRock: false,
      flatLanding: false,
      tall: false,
      beautifulSetting: false,
      sent: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const handleCancel = () => {
    setEditingKey('');
  };

  const handleSave = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...dataSource];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setDataSource(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataSource(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleSaveTable = async (key) => {
    try {
  
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    console.log("key", key)
    for(var i = key; i < dataSource.length; i++){
      dataSource[i].rank = String(parseInt(dataSource[i].rank) - 1)
    }
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData = {
      key: dataSource.length + 1,
      rank: String(dataSource.length + 1),
      grade: 'X',
      name: 'X',
      location: "X",
      uncontrived: false,
      obviousStart: false,
      greatRock: false,
      flatLanding: false,
      tall: false,
      beautifulSetting: false,
      sent: false,
    };
    setDataSource([...dataSource, newData]);
  };

  const onDragEnd = ({ active, over }) => {
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => i.key === active.id);
        const overIndex = previous.findIndex((i) => i.key === over?.id);
        try{
          if(dataSource[activeIndex].rank > dataSource[overIndex].rank){
              for(var i = overIndex; i < activeIndex; i++){
                dataSource[i].rank = String(parseInt(dataSource[i].rank) + 1);
                dataSource[activeIndex].rank = String(parseInt(dataSource[overIndex].rank) - 1)
              }
          }
          if(dataSource[activeIndex].rank < dataSource[overIndex].rank){
            for(i = overIndex; i > activeIndex; i--){
              dataSource[i].rank = String(parseInt(dataSource[i].rank) - 1);
              dataSource[activeIndex].rank = String(parseInt(dataSource[overIndex].rank) + 1)
            }
        }
      } catch (e){
        console.log("failed: ", e)
      }

        return arrayMove(previous, activeIndex, overIndex);
      });
    }
  };

  const mergedColumns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.inputType === 'boolean' ? 'boolean' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  return (
    <div>
      {/* <Button
        onClick={handleSaveTable}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Save Table
      </Button> */}
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a row
      </Button>
      <DndContext onDragEnd={onDragEnd}>
        <SortableContext
          // rowKey array
          items={dataSource.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Form form={form} component={false}>
          <Table
            components={{
              body: {
                row: Row,
                cell: EditableCell,
              },
            }}
            rowKey="key"
            bordered
            dataSource={dataSource}
            columns={mergedColumns}
            rowClassName="editable-row"
          />
          </Form>
        </SortableContext>
      </DndContext>
    </div>
  );
};
export default MainTable;
