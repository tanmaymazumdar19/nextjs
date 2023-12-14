import { faker } from '@faker-js/faker'
import {ESTATE} from "@/constant/states";

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}

export type Product = {
  id: number
  progress: string
  item: string
  created_at: Date
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const states: string[] = [ESTATE.DRAFT, ESTATE.COMPLETE, ESTATE.PENDING]

const newProduct = (): Product => {
  return {
    id: faker.number.int({ min: 330000, max: 956000 }),
    progress: states[Math.floor(Math.random() * states.length)],
    item: faker.word.words({ count: { min: 3, max: 5 }}),
    created_at: faker.date.recent()
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Product[] => {
    const len = lens[depth]!
    return range(len).map((d): Product => newProduct())
  }

  return makeDataLevel()
}
