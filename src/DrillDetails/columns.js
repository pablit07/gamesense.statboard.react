    const columns = [
      {
        Header: "Team",
        accessor: "playerTeam",
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
        accessor: "playerFirstName",
        style: {
          textAlign: 'left'
        },
        width: 150,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Last Name",
        accessor: "playerLastName",
        style: {
          textAlign: 'left'
        },
        width: 150,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Pitcher/Drill",
        accessor: "name",
        style: {
          textAlign: 'left'
        },
        width: 200,
        maxWidth: 100,
        minWidth: 100
      }
    ];

export default columns;