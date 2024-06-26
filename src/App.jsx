import './App.css'
import { flexRender } from '@tanstack/react-table'
import React from 'react'
import { memo } from 'react'
import { useTableGenerator } from './useTableGenerator'

function App() {
  const { table } = useTableGenerator()
  return (
    <>
      <TableHeader table={table} />
      <TableData table={table} />
    </>
  )
}

const TableHeader = ({ table }) => {
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => {
        return (
          <React.Fragment key={headerGroup.id}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {headerGroup.headers.map((header) => {
                return (
                  <div key={header.id}>
                    <div style={{ display: 'flex' }}>
                      {
                        // biome-ignore lint/a11y/useKeyWithClickEvents: any allow
                        <div onClick={header.column.getToggleSortingHandler()}>
                          <SortedArrow status={header.column.getIsSorted()} />
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      }
                    </div>
                    {header.column.getCanFilter() && <TableFilter header={header} />}
                  </div>
                )
              })}
            </div>
          </React.Fragment>
        )
      })}
    </>
  )
}

const SortedArrow = ({ status }) => {
  if (status === 'asc') {
    return <span>⬆️</span>
  }
  if (status === 'desc') {
    return <span>⬇️</span>
  }
  return null
}

const TableData = ({ table }) => {
  return (
    <>
      {table.getRowModel().rows.map((row) => {
        return (
          <React.Fragment key={row.original.id}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <div key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                )
              })}
            </div>
          </React.Fragment>
        )
      })}
    </>
  )
}

const TableFilter = memo(({ header }) => {
  return <input type="text" onChange={(e) => header.column.setFilterValue(e.target.value)} />
})

export default App
