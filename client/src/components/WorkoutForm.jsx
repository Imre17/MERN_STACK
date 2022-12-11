import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    const workout = {title, load ,reps};

    const response = await fetch('http://localhost:3000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()

    if(!response.ok) {
      setError(data.error)
      setEmptyFields(data.emptyFields)
    }

    if(response.ok) {
      setLoad('')
      setTitle('')
      setReps('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: data })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Add a New Workout</h3>

      <label>Exersize Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={ title } 
        className={emptyFields.includes('title') ? 'error' : ''} 
      />
     
      <label>Load<strong>(in KG)</strong>:</label>
      <input 
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={ load }  
        className={emptyFields.includes('load') ? 'error' : ''} 
      />
      
      <label>Reps:</label>
      <input 
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={ reps }  
        className={emptyFields.includes('reps') ? 'error' : ''} 
      />

      <button type='submit'>Add Workout</button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default WorkoutForm