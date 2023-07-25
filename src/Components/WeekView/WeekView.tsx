import { Badge, Card, Popover, Table, Tag } from 'antd';
import { IEvent, IProps } from './WeekView.inerface';
import moment from 'moment';
import type { ColumnsType } from 'antd/es/table';



const WeekView = (props: IProps) => {

    const { events, week } = props
    let data: Record<string, Array<IEvent>> = {}
    events.forEach((event: IEvent) => {
        const currentDay = String(moment(event.date, "DD/MM/YYYY").toDate());
        const currentDayArray = currentDay.split(" ")
        const key = `${currentDayArray[0]}${currentDayArray[1]}${currentDayArray[2]}`
        try {
            data[key].push(event)
        } catch (error) {
            data[key] = []
            data[key].push(event)
        }
    })

    const startOfWeek = moment().add(week, 'weeks').startOf('isoWeek')
    const endOfWeek = moment().add(week, 'weeks').endOf('isoWeek')

    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
        days.push(String(day.toDate()));
        day = day.clone().add(1, 'd');
    }

    let columns: ColumnsType<Record<string, Array<IEvent>>> = []

    function generateDarkColour() {
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += Math.floor(Math.random() * 10);
        }
        return color;
    }
    function content(event: IEvent) {

        return `${event.title} for ${event.duration}`
    }


    days.forEach((day) => {
        const dayArray = day.split(" ")

        columns.push(
            {
                title: `${dayArray[0]} ${dayArray[2]}`,
                dataIndex: `${dayArray[0]}${dayArray[1]}${dayArray[2]}`,
                key: `${dayArray[0]}${dayArray[1]}${dayArray[2]}`,
                render: (data: Array<IEvent>) => {
                    if (data) {
                        return (<>
                            {data.map((each) =>
                                <>
                                    <Badge.Ribbon text={"Event"} color={generateDarkColour()}>
                                        <Popover content={content(each)}>
                                            <Card hoverable={true} style={{ margin: "5px" }} size="small">
                                                <>
                                                    <Tag color={"blue"}>
                                                        {each.title}
                                                    </Tag>
                                                </>
                                            </Card>
                                        </Popover>
                                    </Badge.Ribbon>
                                </>
                            )}
                        </>
                        )
                    }

                    else
                        return null
                }
            }
        )
    })


    return (
        <>
            <Table className='animated-table' columns={columns} dataSource={[data]} pagination={false} />
        </>

    );
};

export default WeekView;
