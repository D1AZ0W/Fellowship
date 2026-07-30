import { ProfileCard } from '#/components/profile/ProfileCard'

export const Profile = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-extrabold text-accent-foreground">
        Profile :
      </h1>
      <ProfileCard />
    </div>
  )
}
