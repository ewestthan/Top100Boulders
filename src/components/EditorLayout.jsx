import '../styling/Layout.css';
import { Button, Form, Input, Popconfirm, Table, Checkbox, InputNumber, Typography, AutoComplete  } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import {logout, db, auth} from "../firebase/initFirebase";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    SaveOutlined,
    PlusCircleFilled,
    PlusCircleOutlined
  } from '@ant-design/icons';
  import { Layout, Menu, theme } from 'antd';
  import React, { useState } from 'react';
import EditMainTable from './EditMainTable';
  const { Header, Sider, Content } = Layout;



  const EditLay = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const [addTrigger, setAddTrigger] = useState(0);
    const [writeTrigger, setWriteTrigger] = useState(0);

    return (
      <Layout>
 
        <Sider trigger={null} collapsible collapsed={collapsed}
        style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}>
          <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
            <Menu
            theme="dark"
            mode="inline"
            style={{marginTop: 50}}
            >
                <Button
                   onClick={() => {
                        setWriteTrigger((writeTrigger) => writeTrigger + 1);
                    }}
                    type="primary"
                    style={{
                    marginBottom: 16,
                    marginLeft: 15,
                    backgroundColor: "transparent",
                    color: "#B4D3B2",
                    boxShadow: "none",
                    }}
                >
                    <SaveOutlined/>
                    Save Table
                </Button> 

                <Button
                     onClick={() => {
                        setAddTrigger((addTrigger) => addTrigger + 1);
                    }}
                    type="primary"
                    style={{
                    marginBottom: 16,
                    marginLeft: 15,
                    backgroundColor: "transparent",
                    border: 0,
                    color: "#B4D3B2",
                    boxShadow: "none",
                    }}>
                    <PlusCircleOutlined/>
                    Add Row
                </Button> 
            </Menu>

        </Sider>

        <Layout className="site-layout"
        style={{
            marginLeft: 200,
        }}>
                <Header
                style={{
                    padding: 0,
                    position: "sticky",
                    top: 0, 
                    zIndex: 4
                }} >

                <Button onClick={logout}
                    style={{
                        paddingTop: 20,
                        float: "right",
                        backgroundColor: "transparent",
                        border: 0,
                        color: "#B4D3B2"
                        }}>
                    <UserOutlined/> Logout
                </Button>

                </Header>

            <Content style={{marginRight: 30}}>
                <EditMainTable addTrigger={addTrigger} writeTrigger={writeTrigger}/>
            </Content>
        </Layout>
      </Layout>
    );
  };
  export default EditLay;