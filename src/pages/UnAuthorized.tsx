
import { Link } from 'react-router'

export default function UnAuthorized() {
  return (
    <div>
      <h1 className='text-3xl font-bold text-center mt-20'>403 - Unauthorized Access</h1>
      <p className='text-center mt-4'>You do not have permission to view this page.</p>
      <Link to="/" className='text-center block mt-6 text-blue-500 underline'>Go to Home</Link>
    </div>
  )
}
