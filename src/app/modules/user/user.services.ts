import { TUser } from "./user.interface"
import { User } from "./user.model"

const createUserIntoDB = async(payload: TUser) => {
    const result = await User.create(payload)
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const {password, ...otherFields} = result.toObject()
    return otherFields
}

export const userService = {
    createUserIntoDB
}