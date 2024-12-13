import { Link } from 'lucide-react'
import React from 'react'

export default function ErrorPage({
    btnText = "Back to Homepage",
    title = "Error!",
    text1,
    text2
}: ErrorPageProps) {
  return (
    <section className="bg-white dark:bg-[var(--rebel-yellow-overlay)]">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-[var(--rebel-yellow)]">{title}</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">{text1}</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">{text2}</p>
            <Link href={'/'} className="inline-flex text-white bg-[var(--rebel-yellow)] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">{btnText}</Link>
        </div>   
    </div>
</section>
  )
}
