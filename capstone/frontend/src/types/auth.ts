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
  old_password: string
  password: string
  confirm_password: string
}

export type MessageResponse = {
  msg: string
}

export type SendResetPasswordEmailRequest = {
  email: string
}

export type ResetPasswordRequest = {
  password: string
  confirm_password: string
}
