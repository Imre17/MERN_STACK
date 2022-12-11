import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { BiTrash } from 'react-icons/bi';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const WorkoutDetails = ({workout}) => {
  const {dispatch} = useWorkoutsContext()

  const handleClick = async() => {

    const response = await fetch(`http://localhost:3000/api/workouts/${workout._id}`, {
      method: 'DELETE'
    })
    const data = await response.json()

    if(response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: data})
    }
  }

  return (
    <div className="workout-details">
      <h4>{ workout.title }</h4>
      <p><strong>Load(kg):</strong>{workout.load}</p>
      <p><strong>Reps:</strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span onClick={handleClick}><BiTrash /></span>
    </div>
  )
}

export default WorkoutDetails