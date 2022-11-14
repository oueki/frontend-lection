import { useState } from 'react'

const MAX_NUMBER = 30
const MAX_POWER = 10

function someHeavyFunc(maxNumber, maxPow) {
  console.log('someHeavyFunc')
  const data = []
  for (let i = 0; i < maxNumber; i++) {
    const record = {}
    for (let pow = 1; pow <= maxPow; pow++) {
      record[pow] = Math.pow(i, pow)
    }
    data.push(record)
  }
  return data
}

function Row({ record, onClick }) {
  const handleClick = () => {
    onClick(record['1'])
  }
  return (
    <tr onClick={handleClick}>
      {Object.values(record)
        .sort((a, b) => a - b)
        .map((value, i) => (
          <td key={i}>{value}</td>
        ))}
    </tr>
  )
}

function HeaderRow({ maxPow }) {
  const cells = []
  for (let pow = 1; pow <= maxPow; pow++) {
    cells.push(
      <th style={{ minWidth: 100 }} key={pow}>
        ^{pow}
      </th>,
    )
  }
  return <tr>{cells}</tr>
}

export function LazyInitialization() {
  console.log('Example has been rendered!')
  const [data, setData] = useState(() => {
    console.log('useState initialization')
    return someHeavyFunc(MAX_NUMBER, MAX_POWER)
  })

  const shuffle = () =>
    setData((prevValue) => {
      const copy = [...prevValue]
      copy.sort(() => (Math.random() > 0.5 ? 1 : -1))
      return copy
    })

  const sortAscending = () =>
    setData((prevValue) => {
      const copy = [...prevValue]
      copy.sort((a, b) => a['1'] - b['1'])
      return copy
    })

  const sortDescending = () =>
    setData((prevValue) => {
      const copy = [...prevValue]
      copy.sort((a, b) => b['1'] - a['1'])
      return copy
    })

  const removeRow = (rowId) =>
    setData((prevValue) => {
      return prevValue.filter((row) => row['1'] !== rowId)
    })

  return (
    <>
      <div className="flex gap-5">
        <button onClick={sortAscending}>⬆️ Sort</button>
        <button onClick={sortDescending}>⬇️ Sort</button>
        <button onClick={shuffle}>🔀 Shuffle</button>
      </div>

      <table>
        <thead>
          <HeaderRow maxPow={MAX_POWER} />
        </thead>
        <tbody>
          {data.map((record) => (
            <Row key={record['1']} record={record} onClick={removeRow} />
          ))}
        </tbody>
      </table>
    </>
  )
}
