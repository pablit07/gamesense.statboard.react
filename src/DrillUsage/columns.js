    const columns = [
      {
        Header: "Team",
        accessor: "team_name",
        style: {
          textAlign: 'left'
        },
        width: 200,
        maxWidth: 100,
        minWidth: 100,
        toggle: [{label: 'Individ', value: "~"}, {label: "Teams", value: "*"}]
      },
      {
        Header: "First Name",
        accessor: "player_first_name",
        style: {
          textAlign: 'left'
        },
        width: 150,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Last Name",
        accessor: "player_last_name",
        style: {
          textAlign: 'left'
        },
        width: 150,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Drill",
        accessor: "drill",
        style: {
          textAlign: 'left'
        },
        width: 300,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Score",
        accessor: "first_glance_total_score",
        style: {
          textAlign: 'center'
        },
        width: 70,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "App",
        accessor: "app",
        style: {
          textAlign: 'center'
        },
        width: 50,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Device",
        accessor: "device",
        style: {
          textAlign: 'left'
        },
        width: 150,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Date",
        accessor: "completion_timestamp_formatted",
        style: {
          textAlign: 'right'
        },
        width: 225,
        maxWidth: 100,
        minWidth: 100
      },
    ];

export default columns;