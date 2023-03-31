import { Button, Form, Input, Popconfirm, Table, Checkbox, InputNumber, Typography  } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { MenuOutlined, CheckCircleFilled, CloseCircleOutlined} from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { Link, useNavigate } from "react-router-dom";
import { CSS } from '@dnd-kit/utilities';
import { db} from "../firebase/initFirebase";
import { uid } from 'uid';
import { set, ref, onValue } from 'firebase/database';


const MainTable = () => {
  
  useEffect(() => {
        
    onValue(ref(db, 'b264b344b6e/dataSource'), snapshot => {
    const data = snapshot.val()
    if(data !== null){
      setDataSource(data)
    }
    
    })
}, [])

  const [dataSource, setDataSource] = useState([]);

  const defaultColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
      // editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      // editable: true
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      // editable: true,
    },
    {
      title: 'Uncontrived',
      dataIndex: 'uncontrived',
      key: 'uncontrived',
      // editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Obvious Start',
      dataIndex: 'obviousStart',
      key: 'obviousStart',
      // editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Great Rock',
      dataIndex: 'greatRock',
      key: 'greatRock',
      // editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Flat Landing',
      dataIndex: 'flatLanding',
      key: 'flatLanding',
      // editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Tall',
      dataIndex: 'tall',
      key: 'tall',
      // editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Beautiful Setting',
      dataIndex: 'beautifulSetting',
      key: 'beautifulSetting',
      // editable: true,
      inputType: 'boolean',
      render : (text) => text ? <CheckCircleFilled /> : <CloseCircleOutlined />,
    },
    {
      title: 'Sent',
      dataIndex: 'sent',
      key: 'sent',
      // editable: true,
      inputType: 'boolean',
      render : (_, text) => {
        return text.sent ? (<CheckCircleFilled />) : (<CloseCircleOutlined />)
      },
    },
  ];

  return (
    <div>
       <Button>
          <Link to="/login">Log In</Link>
        </Button>
      <Table
        rowKey="key"
        bordered
        dataSource={dataSource}
        columns={defaultColumns}
        rowClassName="editable-row"
      />
    </div>
  );
};
export default MainTable;
