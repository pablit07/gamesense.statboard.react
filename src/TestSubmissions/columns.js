// import React from 'react';

      const columns = [
          {
              Header: "Player ID",
              accessor: "player_id",
              style: {
                  textAlign: 'left'
              },
          },
          {
              Header: "Team",
              accessor: "team",
              style: {
                  textAlign: 'left'
              },
              width: 200,
              maxWidth: 100,
              minWidth: 100
          },
          {
              Header: "#",
              accessor: "number_of_responses",
              sortable: true,
              filterable: true,
              style: {
                  textAlign: 'center'
              },
              width: 70,
          },
          {
              Header: "Upload",
              accessor: "source_etl",
              sortable: true,
              filterable: true,
              style: {
                  textAlign: 'left'
              },
              width: 25
          },
          {
              Header: "Device",
              accessor: "device",
              sortable: true,
              filterable: true,
              style: {
                  textAlign: 'right'
              },
              width: 100,
          },
          {
              Header: "Test Date",
              accessor: "test_date",
              sortable: false,
              filterable: false,
              style: {
                  textAlign: 'right'
              },
              width: 200,
          },
          {
              Header: "Actions",
              sortable: false,
              filterable: false,
              width: 200
          },
      ]

export default columns;