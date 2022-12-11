import React, { useEffect } from 'react'
// Context
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
// Components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {

  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async() => {
      const response = await fetch('http://localhost:3000/api/workouts')

      const data = await response.json()
      
      if(response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: data})
      }
    }

    fetchWorkouts()
  },[dispatch])

  return (
    <div className="home">
      <div className="workouts">
        { workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
        <WorkoutForm />
    </div>
  )
}

export default Home