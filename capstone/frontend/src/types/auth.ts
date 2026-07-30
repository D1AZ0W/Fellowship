export type User = {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  profile_picture: string | null
}

export type LoginRequest = {
  username: string
  password: string
}

export type RegisterRequest = {
  username: string
  first_name: string
  last_name: string
  email: string
  password: string
  confirm_password: string
  profile_picture?: File | null
}

export type ChangePasswordRequest = {
  password: string
  confirm_password: string
}

export type MessageResponse = {
  msg: string
}
