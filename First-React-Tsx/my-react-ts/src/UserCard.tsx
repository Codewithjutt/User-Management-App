import type { user } from './types'



interface userCardProps {
    user: user,
    onDelete: (id: number) => void
}

export function UserCard({ user, onDelete }: userCardProps) {
    console.log(user,"user in UserCard")
    return (

        <div className="user-card">
             <h2>{user.name}</h2> 
             <p>{user.email}</p>
             <button onClick={() => onDelete(user.id)}>Delete User!</button>
        </div>


    )
}
