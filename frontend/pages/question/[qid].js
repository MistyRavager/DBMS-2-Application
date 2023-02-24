import {useRouter} from 'next/router'

export default function Question() {
    const router = useRouter()
    const {qid} = router.query
    return (
        <div>
            <h1>Question {qid}</h1>
        </div>
    )
}