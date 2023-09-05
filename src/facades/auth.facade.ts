import { Request, Response } from 'express'
// import jwt from 'jsonwebtoken'
// import { Document } from 'mongoose'
import bcrypt from 'bcrypt'

import { IUser } from '../dtos/Iuser.dto'
import UserModel from '../models/users.model'
import { createJWT } from '../libs/jwt'

class AuthFacade {
  public async register (req: Request, res: Response): Promise<Response > {
    const { username, email, password }: IUser = req.body
    const existingUser = await UserModel.findOne({ email })
    if (existingUser != null) res.status(500).send('User already exists')

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const newUser = new UserModel({
      username,
      email,
      password: hashPassword
    })

    const userSaved = await newUser.save()
    const token = await createJWT({ id: userSaved.id, email: userSaved.email })
    res.cookie('token', token)

    res.json({
      id: userSaved.id,
      username: userSaved.username,
      email: userSaved.email
    //   createdAt: userSaved.createdAt,
    //   updatedAt: userSaved.updatedAt
    })
    return res
  }
} export default new AuthFacade()
