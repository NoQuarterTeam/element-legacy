import { Habit } from "./habit.entity"
import { InputHabit } from "./habit.input"

import { Service } from "typedi"

@Service()
export class HabitService {
  async findById(habitId: string): Promise<Habit> {
    const habit = await Habit.findOne(habitId)
    if (!habit) throw new Error("habit not found")
    return habit
  }

  async findAll(): Promise<Habit[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const habits = await Habit.getRepository()
          .createQueryBuilder("habit")
          .getMany()

        resolve(habits)
      } catch (error) {
        reject(error)
      }
    })
  }

  create(data: InputHabit): Promise<Habit> {
    return new Promise(async (resolve, reject) => {
      try {
        // const { elementId, ...habitParams } = req.body;
        // const element = await Element.findOne(elementId);
        // if (!element) throw new Error("not found");
        // // If the element being added has already been a habit but archived, update archived to false.
        // const habitsByElement = await Habit.find({ element });
        // const habitByElement = habitsByElement[0];
        // if (habitByElement) {
        //   habitByElement.archived = false;
        //   await habitByElement.save();
        //   resolve(habitByElement)
        // } else {
        //   let habit = await Habit.create(habitParams).save();
        //   if (!habit) throw new Error("not found");
        //   habit.element = element;
        //   await habit.save();
        //   resolve(habit)
        // }
        // const habit = await Habit.create({
        //   ...data,
        // }).save()
        // resolve(habit)
      } catch (error) {
        reject(error)
      }
    })
  }

  update(habitId: string, data: InputHabit): Promise<Habit> {
    return new Promise(async (resolve, reject) => {
      try {
        const habit = await this.findById(habitId)
        if (!habit) throw new Error("habit not found")
        Object.assign(habit, data)
        await habit.save()
        resolve(habit)
      } catch (error) {
        reject(error)
      }
    })
  }

  destroy(habitId: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const habit = await Habit.findOne(habitId)
        if (!habit) throw new Error("not found")
        await habit.remove()
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  }
}
