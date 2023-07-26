const Entry = ({ entry, toggleImportance, deleteById }) => {

  return (
    <li className='entry'>
      Name: {entry.name}
      Number: {entry.number} 
      <button onClick={deleteById}>Delete</button>
    </li>
  )
}

export default Entry