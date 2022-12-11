import Workout from '../models/workoutModel.js';
import mongoose from 'mongoose'

// get all workouts
export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
  }
  catch(error) {
    res.status(404).json({error: error.message})
  }
}

// get single workout
export const getSingleWorkout = async (req, res) => {
  const { id } = req.params
  
  if(!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if(!workout) return res.status(404).json({error: 'Not such workout'})

  res.status(200).json(workout)


}

// create new workout
export const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load) {
    emptyFields.push('load')
  }
  if(!reps) {
    emptyFields.push('reps')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields!', emptyFields})
  }

  // add document to DB
  try {
    const workout = await Workout.create({title, load, reps})
    res.status(200).json(workout)
  }
  catch(error) {
    res.status(400).json({error: error.message})
  }
}
// delete workout
export const deleteWorkout = async(req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId(id)) {
    res.status(404).json({error: 'Not such workout to delete'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    res.status(404).json({error: 'Not such workout'})
  }

  res.status(200).json(workout)
}

// update workout
export const updateWorkout = async(req, res) => {
  const { id } = req.params

  if(!mongoose.Types.ObjectId(id)) {
    res.status(404).json({error: 'Not such workout to delete'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if(!workout) {
    res.status(404).json({error: 'Not such workout'})
  }

  res.status(200).json(workout)
}