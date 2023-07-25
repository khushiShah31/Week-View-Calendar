import WeekView from '../../Components/WeekView/WeekView';
import { Button, Layout, Typography } from 'antd';
import SideBar from '../../Components/SideBar/SideBar';
import './Calendar.css'
import { IEvent } from './Calender.interface';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import React from 'react';
import moment from 'moment';
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

let events: IEvent[] = require('../../Data/Events.json');

function Calendar() {

  const [currentWeek, SetCurrentWeek] = useState(0)
  
  const [startMonth, SetStartMonth] = useState(moment().add(currentWeek, 'weeks').startOf('isoWeek').format('MMMM YYYY'))
  const [endMonth, SetEndMonth] = useState(moment().add(currentWeek, 'weeks').endOf('isoWeek').format('MMMM YYYY'))

  useEffect(()=>{
    SetStartMonth(moment().add(currentWeek, 'weeks').startOf('isoWeek').format('MMMM YYYY'))
    SetEndMonth(moment().add(currentWeek, 'weeks').endOf('isoWeek').format('MMMM YYYY'))        
  },[currentWeek])


  return (
    <>
      <Layout>
        <Header className='Header'>
          <Title level={2} style={{ color: "#3A3A3A", margin: "10px" }}>
            Event Calendar
          </Title>
          <Button className='Button' onClick={()=>{SetCurrentWeek(0)}}> This week </Button>
          <Button type='text' icon={<LeftOutlined />} style={{marginRight : '20px'}} onClick={()=>{SetCurrentWeek(currentWeek-1)}} />
          <Button type='text' icon={<RightOutlined />} style={{marginLeft : '20px'}} onClick={() => SetCurrentWeek(currentWeek+1)} />
          <Title level={5} style={{ color: "#3A3A3A", margin: "30px" }}>

            {
              startMonth.split(" ")[1] === endMonth.split(" ")[1] ?
                startMonth === endMonth ? startMonth : `${startMonth.split(" ")[0]} - ${endMonth.split(" ")[0]} ${endMonth.split(" ")[1]}`
                : `${startMonth} - ${endMonth}`
            }
          </Title>
        </Header>
        <Layout>
          <Sider width={"20%"} className={"Sider"}> <SideBar /> </Sider>
          <Content className='Content'>
            <div className="Calendar">
              <WeekView events={events} week={currentWeek} />
            </div>
          </Content>

        </Layout>

      </Layout>

    </>
  );
}

export default Calendar;
