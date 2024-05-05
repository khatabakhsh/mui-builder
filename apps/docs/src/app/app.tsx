// import { FormBuilderProps } from 'packages/core/src/components/builder/builder.types';

import { Link, Route, Routes } from 'react-router-dom';

import { Stack } from '@mui/material';

import Builder, { BuilderProps } from '@mui-builder/core';

export function App() {
  const children: BuilderProps[] = [
import { Builder, FormBuilderProps } from '@mui-builder/core';
import { Checkbox, IconButton } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { IconChevronDown } from '@tabler/icons-react';
import { Person, makeData } from './makeData';

const columns: ColumnDef<Person>[] = [
  {
    id: 'expander',
    size: 0,
    enableHiding: false,
    enableResizing: false,
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <IconButton
          {...{
            onClick: row.getToggleExpandedHandler(),
            sx: { cursor: 'pointer', transform: row.getIsExpanded() ? 'rotate(180deg)' : '', ml: '2px' }
          }}
        >
        <IconChevronDown />
        </IconButton>
      ) : (
        <IconButton disabled>
          <IconChevronDown opacity={0.5} />
        </IconButton>
      );
    }
  },
  {
    id: 'select',
    size: 0,
    enableHiding: false,
    enableResizing: false,
    header: ({ table }) => (
      <Checkbox
        size="small"
        {...{
          checked: table?.getIsAllRowsSelected(),
          indeterminate: table?.getIsSomeRowsSelected(),
          onChange: table?.getToggleAllRowsSelectedHandler()
        }}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        size="small"
        {...{
          checked: row?.getIsSelected(),
          disabled: !row.getCanSelect(),
          indeterminate: row.getIsSomeSelected(),
          onChange: row.getToggleSelectedHandler()
        }}
      />
    )
  },
  {
    id: 'firstName',
    accessorKey: 'firstName',
    header: 'نام',
    cell: (info) => info.getValue(),
    minSize: 160,
    size: 160
  },
  {
    id: 'lastName',
    accessorKey: 'lastName',
    header: 'نام خانوادگی',
    cell: (info) => info.getValue(),
    minSize: 190,
    size: 190
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: 'سن',
    cell: (info) => info.getValue(),
    minSize: 90,
    size: 90
  },
  {
    id: 'visits',
    accessorKey: 'visits',
    header: 'تعداد نمایش',
    cell: (info) => info.getValue()
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'وضعیت',
    cell: (info) => info.getValue()
  },
  {
    id: 'progress',
    accessorKey: 'progress',
    header: 'درصد',
    cell: (info) => info.getValue(),
    minSize: 110,
    size: 110
  }
];

export function App() {
  const tableBuilderJson: FormBuilderProps[] = [{
    id: "table-test",
    groupType: 'table',
    type: 'table',
    props: {
      id: "test",
      columns,
      data: makeData(100),
    }
  }]
  const groupList: FormBuilderProps[] = [
    // Fields
    {
      id: 'form-field-1',
      groupType: 'form',
      type: 'field-text',
      props: {
        id: 'Field-One',
        formId: '20', 
        label: 'Field One (Form Id: 20)',
        dependesies: ['FieldTwo'],
        script: `
          if(forms?.[21].getValues()?.FieldTwo === "erfan"){
            return {
                label: "blue"
            }
          }`,
        api: {
          configs: {
            url: `return ("https://jsonplaceholder.typicode.com/todo8888s/" + formMethod.getValues()?.FieldTwo);`,
            method: 'post',
            data:`return  formMethod.getValues();`,
          },
          queries: {
            enable: `
            if(formMethod.getValues()?.FieldTwo === 'api'){
              return true;
            }
            return false;
            `,
          },
        },
        defaultValue: 'default value field one',
      },
    },
    {
      id: 'form-field-2',
      groupType: 'form',
      type: 'field-text',
      props: {
        id: 'FieldTwo',
        formId: '20',
        label: 'Field Two (Form Id: 20)',
      },
    },

    {
      id: 'form-field-273',
      groupType: 'grid',
      type: 'container',
      props: {
        rowSpacing: 2,
        columnSpacing: 2,
        children: [
          {
            id: 'form-field-4kldjd',
            groupType: 'grid',
            type: 'item',
            props: {
              children: {
                id: 'form-field-4',
                groupType: 'form',
                type: 'field-text',
                props: {
                  id: 'Field4',
                  formId: '20',
                  label: 'Field 4 (Form Id: 20)',
                },
              },
            },
          },

          {
            id: 'form-field-5',
            groupType: 'grid',
            type: 'item',
            props: {
              children: {
                id: 'form-field-4',
                groupType: 'form',
                type: 'field-text',
                props: {
                  id: 'Field4',
                  formId: '20',
                  label: 'Field 5 (Form Id: 20)',
                },
              },
            },
          },
        ],
      },
    },

    {
      id: 'form-field-3',
      groupType: 'form',
      type: 'field-text',
      props: {
        id: 'Field-Three',
        formId: '21',
        label: 'Field Three (Form Id: 21)',
        // helperText: 'Helper Text',
        rule: {
          // required: {
          //   message: 'this is required',
          //   value: true,
          // },
          // validate: (value, formValues) => {
          //   if(value === 'val')
          //   return 'rule validate';
          // },
          validate: `
          if(value === 'val')
            return 'rule validate';
          `,
        },
      },
    },

    // Actions
    {
      id: 'form-action-1',
      groupType: 'form',
      type: 'action-submit',
      props: {
        formId: '20',
        children: 'Submit (20)',
        onAction: 'console.log("Form 20: " , values);',
        api: {
          configs: {
            url: `return ("https://jsonplaceholder.typicode.com/Actions/");`,
            method: 'post',
            data: `return formMethod.getValues();`,
          },
          queries: {
            enable: false,
          },
        },
      },
    },
    {
      id: 'form-action-2',
      groupType: 'form',
      type: 'action-submit',
      props: {
        formId: '21',
        children: 'Submit (21)',
        onAction: 'console.log("Form 21: " , values)',
      },
      configs: {
        loading: {
          sx: {
            bgcolor: '#c28d2b',
          },
        },
      },
    },
  ];

  return (
    <div>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/grid">Grid</Link>
            <Link to="/table">Table</Link>
          </li>
          <li>
            <Link to="/utils">Utils</Link>
          </li>
          <li>
            <Link to="/form">Form</Link>
          </li>
          <li>
            <Link to="/core">Core</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/core"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/page-2">Click here for page 2.</Link>
            </div>
          }
        />
        <Route
          path="/"
          element={
            <Stack direction="row" alignItems="flex-end">
              <Builder children={children} />
            <Stack direction="column" alignItems="flex-end">
              <Builder groupList={groupList} />
              <Builder groupList={tableBuilderJson} />
            </Stack>
          }
        />
        {/* <Route path="/table" element={<Table />} /> */}
        <Route path="/" element={<div>
          <Builder groupList={groupList} />
          <Builder groupList={groupList} />
        </div>} />
      </Routes>
    </div>
  );
}

export default App;
