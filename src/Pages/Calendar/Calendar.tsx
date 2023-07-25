import WeekView from '../../Components/WeekView/WeekView';
import { Layout, Typography } from 'antd';
import SideBar from '../../Components/SideBar/SideBar';
import './Calendar.css'
import { IEvent } from './Calender.interface';
const { Header, Content, Sider } = Layout;
const { Title } = Typography;

let events: IEvent[] = require('../../Data/Events.json');

function Calendar() {
  return (
    <>
      <Layout>
        <Header className='Header'>
          <Title level={2} style={{ color: "#3A3A3A", margin: "10px" }}>
            Event Calendar
          </Title>
        </Header>
        <Layout>
          <Sider width={"20%"} className={"Sider"}> <SideBar /> </Sider>
          <Content className='Content'>
            <div className="Calendar">
              <WeekView events={events} />
            </div>
          </Content>

        </Layout>

      </Layout>

    </>
  );
}

export default Calendar;
