import Navbar from '../../components/Navbar'
import Results from '../../components/Results'

export default function Page() {
    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24">
                <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mt-1 flex justify-center font-medium text-2xl leading-9 text-gray-900 sm:text-2xl sm:tracking-tight lg:text-2xl">
                            <span className='mr-2'>search results</span>
                        </div>
                    </div>
                </div>
            <Results />
            </div>
        </>
    )
}