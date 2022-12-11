import express from 'express';
import {
  createWorkout, 
  deleteWorkout, 
  getAllWorkouts, 
  getSingleWorkout, 
  updateWorkout
} from '../controllers/workoutController.js';

const router = express.Router()

//GET all workouts
router.get('/', getAllWorkouts)

//GET single workouts
router.get('/:id', getSingleWorkout)

// POST workout
router.post('/', createWorkout)

// DELETE workout
router.delete('/:id', deleteWorkout)

// PATCH workout
router.patch('/:id', updateWorkout)

export default router;
