import {
    Users,
    Settings,
    UserPlus,
    UserMinus,
    LogOut,
    Receipt,
    FileEdit,
    Trash2,
    HandCoins,
    ArrowRightLeft
} from 'lucide-react'
import type { Activity } from '#/types/activity'

export const getActivityIcon = (type: Activity['activity_type']) => {
    switch (type) {
        case 'GC': return <Users className="h-5 w-5 text-blue-500" />
        case 'GU': return <Settings className="h-5 w-5 text-blue-500" />
        case 'MA': return <UserPlus className="h-5 w-5 text-green-500" />
        case 'MR': return <UserMinus className="h-5 w-5 text-red-500" />
        case 'ML': return <LogOut className="h-5 w-5 text-orange-500" />
        case 'EC': return <Receipt className="h-5 w-5 text-green-500" />
        case 'EU': return <FileEdit className="h-5 w-5 text-blue-500" />
        case 'ED': return <Trash2 className="h-5 w-5 text-red-500" />
        case 'SC': return <HandCoins className="h-5 w-5 text-emerald-500" />
        case 'TO': return <ArrowRightLeft className="h-5 w-5 text-purple-500" />
        default: return <Users className="h-5 w-5 text-muted-foreground" />
    }
}