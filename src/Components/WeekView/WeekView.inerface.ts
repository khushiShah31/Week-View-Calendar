export interface IColumn {
    Header: string;
    accessor: string;
}

export interface IEvent {
    id : string;
    title: string;
    date: string;
    duration: string;
}

export interface IProps{
    events : IEvent[]
    week : number
}

