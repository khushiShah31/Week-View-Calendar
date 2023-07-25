import { PlusOutlined } from "@ant-design/icons"
import { Button, Modal, Form, Input, DatePicker, message, Timeline } from "antd"
import "./SideBar.css";
import { useState } from "react";
import { IEvent, IFormData, ITimelineItem } from "./SideBar.interface";
import moment from "moment";
import Title from "antd/es/typography/Title";



const SideBar = () => {
    let events: IEvent[] = require('../../Data/Events.json');

    const [messageApi, contextHolder] = message.useMessage();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const onFinish = (values: IFormData) => {
        if (values.date < new Date()) {
            messageApi.error('Event can not be create in past!');
            return
        }

        events.push({
            title: values.title,
            date: String(values.date),
            duration: values.duration,
            id: (Math.random() * 100).toString()
        })
        messageApi.success('Event Created Successfully!');
        setIsModalOpen(false);
    };

    const validateMessages = {
        required: '${label} is required!',
    };

    let items:ITimelineItem[] = []

    const currentDate = moment()
    const CurrentMonth = currentDate.month();
    events.forEach((event)=>{
    const eventDate = moment(event.date, "DD/MM/YYYY")
    const eventMonth = eventDate.month()
    if(CurrentMonth === eventMonth && eventDate > currentDate)
    items.push({children : `${event.title} for ${event.duration} on ${eventDate.format('ddd Do MMMM')}`})
    })

    return (
        <>
            {contextHolder}
            <div className="SideBarContainer">
                <Button size="middle" icon={<PlusOutlined />} onClick={showModal}>
                    Create Event
                </Button>
                <div className="Timeline">
                <Title level={5}>Upcoming Events of {currentDate.format('MMMM')} </Title>
                <br/>

                <Timeline 
                    items={items}
                />
                </div>

                <Modal title="Create Event" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item name={'title'} label="Event Title" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={'duration'} label="Duration" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name={'date'} label={'Event Date'} rules={[{ required: true }]}>
                            <DatePicker />
                        </Form.Item>
                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" htmlType="submit">
                                Create
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>

        </>
    )
}
export default SideBar