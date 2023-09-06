import { Request, Response } from 'express'
import authFacade from '../facades/auth.facade'

class AuthController {
  public async register (req: Request, res: Response): Promise <Response> {
    return await authFacade.register(req, res)
  }

  public async login (req: Request, res: Response): Promise <Response> {
    return await authFacade.login(req, res)
  }

  public async logout (req: Request, res: Response): Promise <Response> {
    return authFacade.logout(req, res)
  }
} export default new AuthController()

// export const register = async (req: Request, res: Response): Promise<void> => {
//   const { username, email, password } = req.body

//   try {
//     const salt = await bcrypt.genSalt(10)
//     const hashPassword = await bcrypt.hash(password, salt)
//     const user = new User({
//       username,
//       email,
//       password: hashPassword
//     })

//     const userSaved = await user.save()
//     const token = await createJWT({ id: userSaved.id, email: userSaved.email })
//     res.cookie('token', token)

//     res.json({
//       id: userSaved.id,
//       username: userSaved.username,
//       email: userSaved.email,
//       createdAt: userSaved.createdAt,
//       updatedAt: userSaved.updatedAt
//     })
//   } catch (error) {
//     res.status(500).send(console.log(error))
//   }
// }

// export const login = async (req: Request, res: Response): Promise< Object> => {
//   try {
//     const { email, password } = req.body
//     const userFound = await User.findOne({ email })

//     if (userFound == null) return res.status(400).json({ message: 'User not found - User or password incorrect ' })

//     const passwordFound = await bcrypt.compare(password, userFound.password)

//     if (!passwordFound) return res.status(400).json({ message: 'Password not found - User or password incorrect ' })

//     const token = await createJWT({ id: userFound.id, email: userFound.email })
//     res.cookie('token', token)

//     return res.json({
//       id: userFound.id,
//       username: userFound.username,
//       email: userFound.email,
//       createdAt: userFound.createdAt,
//       updatedAt: userFound.updatedAt
//     })
//   } catch (error) {
//     return res.status(500).json({ message: error })
//   }
// }

// export const logout = (_req: Request, res: Response): Response => {
//   try {
//     console.log('logout')
//     res.cookie('token', '', {
//       expires: new Date(0)
//     })
//     console.log('logout')
//     return res.status(200)
//   } catch (error) {
//     console.log(error)
//     return res.status(400)
//   }
// }
