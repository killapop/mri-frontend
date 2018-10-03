export const bundles = {
  data: [
    {
      bundle_name: 'Lorythaixoides concolor',
      id: '5401b41f-20a9-43ff-a966-9b7450fe7048',
      organisation: 'Bartell LLC',
      beneficiaries: [
        'Jilleen Yeldham',
        'Bord Jopp',
        'Burk Bowie',
        'Maude Wolfer'
      ],
      created_on: '2018-06-11T13:20:23Z',
      updated_on: 'Created',
      state: 'Selected'
    },
    {
      bundle_name: 'Vulpes vulpes',
      id: '2daf2b26-311a-46c2-b2dd-54a2c7f6296c',
      organisation: 'Farrell and Sons',
      beneficiaries: ['Barthel Seabert', 'Rhona Brommage'],
      created_on: '2018-06-05T13:05:45Z',
      updated_on: 'Selected',
      state: 'Assessed'
    },
    {
      bundle_name: 'Columba livia',
      id: '387c4517-e77b-407b-b986-fff58430117a',
      organisation: 'Stoltenberg, Beatty and Robel',
      beneficiaries: ['Innis Fedynski'],
      created_on: '2018-09-09T10:43:20Z',
      updated_on: 'Selected',
      state: 'Assessed'
    },
    {
      bundle_name: 'Sarcorhamphus papa',
      id: '5e310706-9ae3-4eaa-8ae9-5355a747f0e2',
      organisation: 'Bartoletti-Gislason',
      beneficiaries: ['Guthrey Rose'],
      created_on: '2017-10-24T01:39:57Z',
      updated_on: 'Created',
      state: 'Assessed'
    },
    {
      bundle_name: 'Tachyglossus aculeatus',
      id: '4207a8e1-93ed-4367-aee9-29e5cc04c1a6',
      organisation: 'Reichert-Kuvalis',
      beneficiaries: ['Darci Aurelius', 'Cris Waywell'],
      created_on: '2018-03-25T05:42:04Z',
      updated_on: 'Created',
      state: 'Selected'
    },
    {
      bundle_name: 'Carduelis pinus',
      id: '5cfbabc2-b4c1-4207-991e-977d349ab493',
      organisation: 'Torphy Group',
      beneficiaries: ['Vachel Fransson', 'Katrinka Lammin'],
      created_on: '2017-10-30T14:12:09Z',
      updated_on: 'Created',
      state: 'Assessed'
    },
    {
      bundle_name: 'Merops sp.',
      id: 'aa463909-5901-40da-9f77-1d349fbd93a1',
      organisation: 'Sporer LLC',
      beneficiaries: ['Lizette Baldocci', 'Nadya Zecchi'],
      created_on: '2017-12-31T05:39:51Z',
      updated_on: 'Created',
      state: 'Implemented'
    },
    {
      bundle_name: 'Phalacrocorax niger',
      id: 'bdb21e4b-1198-48a0-94fb-9248480b6577',
      organisation: 'Schoen Inc',
      beneficiaries: ['Gwen Hynes'],
      created_on: '2017-12-08T13:49:51Z',
      updated_on: 'Selected',
      state: 'Selected'
    },
    {
      bundle_name: 'Sula dactylatra',
      id: '32536c9a-1eea-4cc5-a2bf-bee8c5525cae',
      organisation: 'Larkin, Mayer and Marquardt',
      beneficiaries: ['Lyndsie Paulucci', 'Randene Maharey'],
      created_on: '2018-03-14T01:05:38Z',
      updated_on: 'Selected',
      state: 'Assessed'
    },
    {
      bundle_name: 'Amphibolurus barbatus',
      id: '70d90041-d5e4-4ac0-8705-cb0269e6b456',
      organisation: 'Cruickshank LLC',
      beneficiaries: ['Chiarra Skeleton', 'Hilly Kinkead'],
      created_on: '2018-10-02T07:32:52Z',
      updated_on: 'Selected',
      state: 'Selected'
    }
  ],
  schema: {
    columns: [
      {
        accessor: 'bundle_name',
        Header: 'Bundle ID'
      },
      {
        accessor: 'organisation',
        Header: 'Organisation'
      },
      {
        id: 'beneficiaries',
        Header: 'Beneficiarie(s)'
      },
      {
        accessor: 'created_on',
        Header: 'Created'
      },
      {
        accessor: 'state',
        Header: 'State'
      }
    ]
  }
};
