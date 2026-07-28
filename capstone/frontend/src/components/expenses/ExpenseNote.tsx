import { Separator } from '@base-ui/react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type NoteProps = {
  note: string
}
export const ExpenseNote = ({ note }: NoteProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="p-4">
        <p className="whitespace-pre-wrap text-muted-foreground">{note}</p>
      </CardContent>
    </Card>
  )
}
